var app = angular.module('Crowdsourcing', ['ngRoute'], function ($locationProvider) {
	//neccery to get the current url
	$locationProvider.html5Mode(true);
});

app.controller('ListingController', function ($scope, $location, $http) {
	
	
	//get current url to get relevant listing
	//returns relative path => /listing/
	var path = $location.path();
	
	
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
		var title = ""
		var pic = "";
		
		//get title
		$http.get('/api/getrandomquestion').success(function (question) {
			title = question.description;
		});
		
		//get picture
		$http.get('/api/geteandompic').success(function (picture) {
			//should be chanched to json 
			pic = picture;
		});
		
		setTimeout(function () {
			sweetAlert({
				//	title: "Is this room furnished?",
				title: title,
				imageUrl: pic,
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





