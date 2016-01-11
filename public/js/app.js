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

app.controller('NavCtrl', function ($scope, $http, $uibModal, UserService) {
	
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




	$scope.addNewReview = function (data) {
		$scope.data = data;
		var modalInstance = $uibModal.open({
			templateUrl: 'views/reviewTemplate.html',
			controller: 'reviewCtrl',
			backdrop: 'static',
			resolve: {
				data: function () {
					return $scope.data;
				}
			}
		});

		
	};

    $scope.askForReview = function () {
        $uibModal.open({
            templateUrl: 'views/askReviewTemplate.html',
            controller: 'reviewCtrl',
            backdrop: 'static',
            resolve: {
                data: function () {
                    return null;
                }
            }
        });
    };
});

app.factory('fileService', function() {
	var files = [];
	return files;
})

