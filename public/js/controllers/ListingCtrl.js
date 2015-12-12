var app = angular.module('Crowdsourcing', ['ngRoute'], function ($locationProvider) {
	/* necessary to get the current url */
	$locationProvider.html5Mode(true);
});

app.controller('ListingController', function ($scope, $location, $http) {
	
	//get current url to get relevant listing
	//returns relative path => /listing/
	var path = $location.path();
	$scope.hide = false;
	$scope.reportListing = function() {
		$http.get("/api/listing/:street/:buildingNumber/:apartmentNumber").success(function (apartment){
			//var count = apartment.flagCount;
			sweetAlert("Thank you!", "This listing has been reported", "success");
			//$scope.listing.flagCount.push($scope.listing.flagCount+1);
			$scope.hide = true;
		});
	};

	//request from server
	$http.get("/api" + path).then(
		function success(listing_info){
			// this callback will be called asynchronously
			// when the response is available

			$scope.listing = listing_info.data;
		}, function error(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			$scope.error = "Could not fetch the listing";			
		});


	var alertPrompt = function () {
		var title = "";
		var pic = "";
		
		//get title
		$http.get('/api/getrandomquestion').success(function (question) {
			title = question.description;
		});
		
		//get picture
		$http.get('/api/listing/:street/:buildingNumber/:apartmentNumber/getrandompic').success(function (picture) {
			//should be changed to JSON format
			pic = picture;
		});

		function chooseRandomPic(){
			var myPix = ["images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg"];
			var randomNum = Math.floor(Math.random() * myPix.length);
			return myPix[randomNum];
		}

		setTimeout(function () {
			sweetAlert({
				//	title: "Is this room furnished?",
				title: title,
			//	imageUrl: pic,
				imageUrl: chooseRandomPic(),
				imageSize: '600x600',
				showCancelButton: true,
				cancelButtonText: "No",
				confirmButtonColor: "#00ff00", // green
				confirmButtonText: "Yes",
				closeOnConfirm: false,
				closeOnCancel: false
			},
            function (isConfirm) {
				if (isConfirm) {
					sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count++)
				}
				else {
					sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count--)
				}
			});
		}, 5000); // 5 seconds
		
	};
	alertPrompt();
});





