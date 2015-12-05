var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/home", {
			templateUrl: "views/home.html",
			controller: "homeCtrl"
		})
		.when("/newReviewForm", {
			templateUrl: "views/reviewTemplate.html",
			controller: "reviewCtrl"
		})
		.otherwise({
			redirectTo: "/home"
		});
});

app.controller('NavCtrl', function ($scope, $http) {
	$http.get('/api/user').success(function (response) {
		$scope.User = response;
	});
});

app.controller("homeCtrl",
	function ($scope, $location, $modal) {

		$scope.addNewReview = function () {
			$modal.open({
				templateUrl: 'views/reviewTemplate.html',
				controller: 'reviewCtrl',
				backdrop: 'static'
			})
		};
	});
