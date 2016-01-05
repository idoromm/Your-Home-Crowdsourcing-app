var app = angular.module('app', ['ngAutocomplete','ngRoute', 'ui.bootstrap', 'ngMdIcons']);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/newReviewForm", {
			templateUrl: "views/reviewTemplate.html",
			controller: "reviewCtrl"
		})
		.otherwise({
			redirectTo: "/home"
		});
});

app.controller('NavCtrl', function ($scope, $http, $modal, UserService) {
	
	//set the user if was not ser previously
	//this function should be called only from 
	//NavCtrl
	var userPromise = UserService.setUser();
	
	userPromise.then(function (userObj) {
		
		//get all user details
		$scope.points = UserService.getUserPoints() == 1 ? UserService.getUserPoints() + " point" : UserService.getUserPoints() + " points";
		$scope.message = 'Hi';
		$scope.User = UserService.getUserName();
	}, function (error) {

	});




	$scope.addNewReview = function () {
		$modal.open({
			templateUrl: 'views/reviewTemplate.html',
			controller: 'reviewCtrl',
			backdrop: 'static'
		});
	};

    $scope.askForReview = function () {
        $modal.open({
            templateUrl: 'views/askReviewTemplate.html',
            controller: 'reviewCtrl',
            backdrop: 'static'
        });
    };
});

app.factory('fileService', function() {
	var files = [];
	return files;
})

