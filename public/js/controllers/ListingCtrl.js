/**
 * Created by Ido on 28/11/2015.
 */

//(function() {
//    angular.module('app', []).controller('ListingCtrl', function($scope) {
//    /*    $scope.data = {
//            Colors: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
//        } */
//        var vm = this;
//        vm.title = 'YOUR  HOME';
//        //$scope.title = 'YOUR  HOME Testing';
//    });
//}());
//


(function() {

    var app = angular.module("Crowdsourcing", []);

    var ListingController = function($scope, $http) {

        var onListingComplete = function(response) {
            $scope.listing = response.data;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the user";
        };


        $http.get("http://localhost:3000/api/listing/Rashi/10/13")
            .then(onListingComplete, onError);


        $scope.message = "Hello, Angular!";


    };

    app.controller("ListingController", ["$scope", "$http", ListingController]);

}());











//(function() {
//
//    var app = angular.module("Crowdsourcing",[]);
//
//    var ListingController = function($scope, $http) {
//
//        var onListingComplete = function(data) {
//            $scope.street = data.street;
//        };
//
//
//        var onError = function(reason) {
//            $scope.error = "Could not fetch the data.";
//        };
//
//        $scope.street = $routeParams.street;
//        listingService.getListing($scope.street).then(onListingComplete, onError);
//
//    };
//
//    app.controller("ListingController", ListingController);
//
//}());