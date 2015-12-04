(function() {
    var app = angular.module("Crowdsourcing", []);

    var ListingController = function($scope,listingService) {

        var onListingComplete = function(response) {
            $scope.listing = response;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the listing";
        };


        listingService.getListing("/api/listing/Rashi/10/13")
            .then(onListingComplete, onError);
    };

    app.controller("ListingController", ["$scope","listingService", ListingController]);

}());




