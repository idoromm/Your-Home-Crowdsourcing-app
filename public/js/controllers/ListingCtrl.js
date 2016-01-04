var app = angular.module('Crowdsourcing', ['ngRoute'], function ($locationProvider) {
    /* necessary to get the current url */
    $locationProvider.html5Mode(true);
});

/* a function that returns -1 if object is NOT in array, and the objects' index if it IS in the array */
var indexOf = function (needle) {
    if (typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (needle) {
            var i = -1, index = -1;

            for (i = 0; i < this.length; i++) {
                if (this[i] === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }
    return indexOf.call(this, needle);
};

app.controller('ListingController', function ($scope, $location, $http, $q, fileUpload, UserService) {
	
	$scope.handle_comment = function (comment) {
		console.log(comment);	
		};
	
	//user getter async
	//every time you need to get the user, inorder to be sure the async
	//function return wrap it like that:
	//
	//userPromise.then(function (userObj) {
	//	==user code here==
	// functions you can call currently in this scope:
	//	userObj => DB object of user
	//	UserService.getUserPoints(); => returns user reputation( int)
	//	UserService.getUserName(); => returns user name(string)
	//}
	var userPromise = UserService.setUser();

    //get current url to get relevant listing
    //returns relative path => /listing/
    var path = $location.path();
    //request from server
	var listingPromise = $http.get("/api" + path);
	
	$q.when(listingPromise,
        function success(listing_info) {
            // this callback will be called asynchronously
            // when the response is available
			$scope.listing = listing_info.data;

			 //This should get us all the listings' images and put them inside $scope.images so we
			//can easily access them in the single.html page by doing {{ images }} or similarly ..
			//Edited By Lior: as  $http.get is Async function we can be sure only here that listing_info 
			//is defined.  
			fileUpload.getUploadedFilesAsync($scope.listing._id).then(function (images) {
				var listing_images = [];
				for (var i = 0; i < images.length; i++) {
					listing_images[i] = '../../../'+ images[i]; 
				}
				$scope.images = listing_images;
			});

        }, function error(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.error = "Could not fetch the listing";
		});
	
	var user = null;
	
	userPromise.then(function (userObj) {
		$scope.currentUser = userObj;
	});


    /* this was hard-coded to check if it works -> and it worked! */
   /* $scope.images = [
        '../../../uploads/5676dc870fea15240aa53637/ddddd.png',
        '../../../uploads/5676dc870fea15240aa53637/eeedddccc.jpg',
        '../../../uploads/5676dc870fea15240aa53637/fdd.jpg',
        '../../../uploads/5676dc870fea15240aa53637/fdfdfdfd.jpg'
    ]; */




    /* We find what question the user was asked, and updated the listing parameters accordingly *
     /  the formula we use is: ((number of people that replied YES) / (number of people that answered at all)) * 100
     */
    setTimeout(function () {
            $scope.listing.crowd_furnished = ($scope.listing.crowd_furnished / $scope.listing.crowd_furnished_total) * 100; // "Is this room furnished?"
            $scope.listing.crowd_windows = ($scope.listing.crowd_windows / $scope.listing.crowd_windows_total) * 100; // "Is there a window in this room?"
            $scope.listing.crowd_renovated = ($scope.listing.crowd_renovated / $scope.listing.crowd_renovated_total) * 100; // "Does this room look renovated?"
            $scope.listing.crowd_light = ($scope.listing.crowd_light / $scope.listing.crowd_light_total) * 100; // "Is this room well-lit?"
        }
        , 1000); // this 1 second timeout is to avoid binding failure in listing page, because when listing loads the $scope takes a second to "refresh"

    /* implements the functionality of the crowd-sourcing aspect of the listing:
     * 1. prompts the user with a random image of the listing
     * 2. asks the user a question about that image
     * 3. updates the DB with the users' input */
    var alertPrompt = function () {
        // var title = "";
        // var pic = "";
		$scope.title = 'test';
		var questions = [];
		var questionsUserAlreadyAnswered = [];
		var user = "";
		
		$q.all([userPromise, listingPromise]).then(function (values){
			console.log(values);
			questions = $http.get('/api/questions');
			questionsUserAlreadyAnswered = $http.get('/api/listing/getQuestionsOfUserInListing/' + values[0]._id + '/' + values[1].data._id);
			user = values[0];
		});
		
		
		$q.all([questions, questionsUserAlreadyAnswered]).then(function (values) {
			//get title
			//$http.get('/api/getrandomquestion').success(function (question) {
			//    title = question.description;
			//});
			
			/*  // gets random picture of the listing picture - don't need this anymore (i think, still don't delete this yet)
         $http.get('/api/listing/:street/:buildingNumber/:apartmentNumber/getrandompic').success(function (picture) {
         //should be changed to JSON format
         $scope.pic = picture;
         }); */

  //      /* get all the questions available in the DB */
  //      $http.get('/api/questions').success(function (qs) {
  //          questions = qs;
  //      });
		
		//userPromise.then(function (userObj) {
		//	//TODO: LIOR: i need the user here to get the question he already answered on this listing
		//	$http.get('/api/listing/getQuestionsOfUserInListing/' + userObj._id + '/' + $scope.listing._id).success(function (userqs) {
		//		questionsUserAlreadyAnswered = userqs;
		//	});
		//});


        /* function that sets the question that the user will be asked (only a question he wasn't asked before!)
         * TODO: need to test if this actually works -> does it return a question really? */
        function setQuestion() {
			//var unansweredQuestions = questions.filter(function(q){
			//    return !~questionsUserAlreadyAnswered.indexOf(q);
			//});
			//
			//// if unanswered questions is empty, all is answered
			//if (unansweredQuestions.length != 0) {
			//    $scope.title = unansweredQuestions[0].description;
			//    $scope.questionToAsk = unansweredQuestions[0];
			//}
			//else {
			//    $scope.title = 'None';
			//    $scope.questionToAsk = 'None';
			//}

			var q; // question we will eventually ask the user
				for (q in values[0]) {
					if (!(q._id in values[1])) {
						/* the user has NOT answered this question yet -> so we can ask him now! */
						$scope.title = q.description;
						$scope.questionToAsk = q;
						return;
					}
				}
				$scope.title = 'None';
				$scope.questionToAsk = 'None';
            // TODO: what happens when we have already asked this user ALL our questions in this specific listing? need to decide!
			}
			
			setQuestion();
			
			function chooseRandomPic() {
				// var myPix = ["images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg"];
				var randomNum = Math.floor(Math.random() * $scope.images.length);
				return $scope.images[randomNum];
			}
			
			/* if the user was asked all the questions already we don't want to ask him again, so we just don't ask him anything */
			if ($scope.title.localeCompare('None') != 0) {
				setTimeout(function () {
					sweetAlert({
						//	title: "Is this room furnished?",
						title: $scope.title,
						imageUrl: $scope.images[0], // hard coded for now
						//       imageUrl: chooseRandomPic(),
						imageSize: '600x600',
						showCancelButton: true,
						cancelButtonText: "No",
						confirmButtonColor: "#00ff00", // green
						confirmButtonText: "Yes",
						closeOnConfirm: false,
						closeOnCancel: false
					},
                    function (isConfirm) {
						userPromise.then(function (userObj) {
							
							/* here we update the DB -> we update 2 different Schemas ->
							 * 1. the userSchema -> we update the ApartmentsAndQuestions field and add this listing and the question that was asked
							 * 2. the listingSchema -> we update the UsersAndQuestions field and add this user and the question that was asked
							 * This way we are "fully updated" and we can access the information through the listing OR the user (or both..) */
							$http.put('/api/user/addListingAndQuestionToUser/' + user._id + '/' + $scope.listing._id + '/' + $scope.questionToAsk._id);
							$http.put('/api/listing/addUserAndQuestionToListing/' + user._id + '/' + $scope.listing._id + '/' + $scope.questionToAsk._id);
							if (isConfirm) {
								sweetAlert("Thanks!", "Your input will help others", "success");
								if (!($scope.questionToAsk._id.localeCompare('5661da7e716f675817f9d68b'))) { // Furnished
									$http.put('/api/listing/changeCrowdFurnishedPercentage/' + $scope.listing._id + '/plus');
								}
								else if (!($scope.questionToAsk._id.localeCompare('5661db59b0b1b91c1d63643d'))) { // Windows
									$http.put('/api/listing/changeCrowdWindowsPercentage/' + $scope.listing._id + '/plus');
								}
								else if (!($scope.questionToAsk._id.localeCompare('5661db6cb0b1b91c1d63643e'))) { // Renovated
									$http.put('/api/listing/changeCrowdRenovatedPercentage/' + $scope.listing._id + '/plus');
								}
								else if (!($scope.questionToAsk._id.localeCompare('5669d90a058ceddc158e97e2'))) { // Light
									$http.put('/api/listing/changeCrowdLightPercentage/' + $scope.listing._id + '/plus');
								}
								else {
									console.log("The ID of the question didn't match any known ID, we go the following ID: " + $scope.questionToAsk._id);
								}
							}
							else {
								sweetAlert("Thanks!", "Your input will help others", "success");
								if (!($scope.questionToAsk._id.localeCompare('5661da7e716f675817f9d68b'))) { // Furnished
									$http.put('/api/listing/changeCrowdFurnishedPercentage/' + $scope.listing._id + '/minus');
								}
								else if (!($scope.questionToAsk._id.localeCompare('5661db59b0b1b91c1d63643d'))) { // Windows
									$http.put('/api/listing/changeCrowdWindowsPercentage/' + $scope.listing._id + '/minus');
								}
								else if (!($scope.questionToAsk._id.localeCompare('5661db6cb0b1b91c1d63643e'))) { // Renovated
									$http.put('/api/listing/changeCrowdRenovatedPercentage/' + $scope.listing._id + '/minus');
								}
								else if (!($scope.questionToAsk._id.localeCompare('5669d90a058ceddc158e97e2'))) { // Light
									$http.put('/api/listing/changeCrowdLightPercentage/' + $scope.listing._id + '/minus');
								}
								else {
									console.log("The ID of the question didn't match any known ID, we go the following ID: " + $scope.questionToAsk._id);
								}
							}
						});
					});
				}, 50000); // 50 seconds TODO: change to 5 seconds after we actually get images from the db
			}
		})
    };

    $scope.hide = false;

    /* report the listing functionality
     * TODO: need to add functionality to what actually happens if the listing gets reported X number of times */
    $scope.reportListing = function () {
		userPromise.then(function (userObj) {
					
				/* check if the user has reported this listing before */
				if (indexOf.call($scope.listing.reportedUsersIDs, $scope.currentUser._id) > -1) {
					sweetAlert("Error", "You have already reported this listing", "error");
				}

			/* the user has not reported this listing yet -> report it*/
				else {
					$http.put("/api" + path + "/incrementFlagCount").success(function () {
						sweetAlert("Thank you!", "This listing has been reported", "success");
						$scope.hide = true;
					});
				
					/* add this user to the reportUsers for this listing */
					$http.put("/api" + path + "/addReportedUser/" + userObj._id + "/" + $scope.listing._id);
				} // TODO: user currently undefined because the call /api/user doesn't work - talk to Lior
			});
		};

    alertPrompt(); // activate the timer (wait a few seconds until the user is prompted)
});





