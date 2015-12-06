var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

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

app.controller('NavCtrl', function ($scope, $http, $modal) {

	$http.get('/api/user').success(function (response) {
		$scope.User = response;
		$scope.message = 'hello madafucka';
	});

	$scope.addNewReview = function () {
		$modal.open({
			templateUrl: 'views/reviewTemplate.html',
			controller: 'reviewCtrl',
			backdrop: 'static'
		});
	};


});

