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

    var ListingController = function($scope,listingService) {

        var onListingComplete = function(response) {
            $scope.listing = response;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the user";
        };


        listingService.getListing("/api/listing/Rashi/10/13")
            .then(onListingComplete, onError);
    };

    app.controller("ListingController", ["$scope","listingService", ListingController]);

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