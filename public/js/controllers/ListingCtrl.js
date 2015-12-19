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

app.controller('ListingController', function ($scope, $location, $http) {

    //get current url to get relevant listing
    //returns relative path => /listing/
    var path = $location.path();
    //request from server
    $http.get("/api" + path).then(
        function success(listing_info) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.listing = listing_info.data;

            console.log($scope.listing);
        }, function error(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.error = "Could not fetch the listing";
        });
    $http.get("/api/user").success(function (data) {
        $scope.currentUser = data;
    });


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


    var alertPrompt = function () {
        // var title = "";
        // var pic = "";
        $scope.title = 'test';
        var questions = [];
        var questionsUserAlreadyAnswered = [];

        //get title
        //$http.get('/api/getrandomquestion').success(function (question) {
        //    title = question.description;
        //});

        // gets random picture of the listing picture TODO: this obviously doesn't work yet
        $http.get('/api/listing/:street/:buildingNumber/:apartmentNumber/getrandompic').success(function (picture) {
            //should be changed to JSON format
            $scope.pic = picture;
        });


        $http.get('/api/questions').success(function (qs) {
            questions = qs;
        });

        // TODO: user currently undefined because the call /api/user doesn't work - talk to Lior
        //$http.get('/api/listing/getQuestionsOfUserInListing/' + $scope.currentUser._id + '/' + $scope.listing._id).success(function (userqs) {
        //    questionsUserAlreadyAnswered = userqs;
        //});


        /* function that sets the question that the user will be asked (only a question he wasn't asked before!) */
        function setQuestion() {
            var q; // question we will eventually ask the user
            for (q in questions) {
                if (!(q._id in questionsUserAlreadyAnswered)) {
                    /* the user has NOT answered this question yet -> so we can ask him now! */
                    $scope.title = q.description;
                    $scope.questionToAsk = q;
                }
            }
            $scope.title = 'None';
            $scope.questionToAsk = 'None';
            // we have already asked this user ALL our questions in this specific listing
        }
        setQuestion();

        function chooseRandomPic() {
            var myPix = ["images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg"];
            var randomNum = Math.floor(Math.random() * myPix.length);
            return myPix[randomNum];
        }

        /* if the user was asked all the questions already we don't want to ask him again, so we just don't ask him anything */
        if($scope.title.localeCompare('None') != 0) {
            setTimeout(function () {
                sweetAlert({
                        //	title: "Is this room furnished?",
                        title: $scope.title,
                        imageUrl: $scope.pic,
                        //imageUrl: chooseRandomPic(),
                        imageSize: '600x600',
                        showCancelButton: true,
                        cancelButtonText: "No",
                        confirmButtonColor: "#00ff00", // green
                        confirmButtonText: "Yes",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function (isConfirm) {
                        $http.put('/api/user/addListingAndQuestionToUser/' + $scope.currentUser._id + '/' + $scope.listing._id + '/' + $scope.questionToAsk._id);
                        $http.put('/api/listing/addUserAndQuestionToListing/' + $scope.currentUser._id + '/' + $scope.listing._id + '/' + $scope.questionToAsk._id);
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
            }, 50000); // 50 seconds TODO: change to 5 seconds after we actually get images from the db
        }
    };

    $scope.hide = false;
    $scope.reportListing = function () {

        console.log($scope.listing);
        console.log($scope.currentUser);

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
            $http.put("/api" + path + "/addReportedUser/" + $scope.currentUser._id + "/" + $scope.listing._id);
        } // TODO: user currently undefined because the call /api/user doesn't work - talk to Lior
    };
    // $scope.hasReportedListing = true;

    alertPrompt();
});





