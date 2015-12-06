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

	$http.get('/api/user').success(function (user) {
						
		$scope.points = user.reputation;
		$scope.message = 'hello';
		
		if (user.facebook) {
			$scope.User = user.facebook.firstName;
		} else if (user.google) {
			if (user.google.firstName) {
				$scope.User = user.google.firstName;
			} else {
				$scope.User = user.google.name;
			}
		} else {
			$scope.User = user.local.name;
		}
	});


	$scope.addNewReview = function () {
		$modal.open({
			templateUrl: 'views/reviewTemplate.html',
			controller: 'reviewCtrl',
			backdrop: 'static'
		});
	};


});

