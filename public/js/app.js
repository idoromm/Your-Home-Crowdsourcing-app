
var app = angular.module('app', []);

app.controller('NavCtrl', function ($scope, $http) {
	$http.get('/api/user').success(function (response) {
		$scope.User = response;
	});
});
