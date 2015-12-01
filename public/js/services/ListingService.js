(function(){

    var listingService = function($http){

        var getListing = function(street){
            return $http.get("URL" + street)
                .then(function(response){
                    return response.data;
                });
        };



        return {
            getListing: getListing
        };

    };

    var module = angular.module("Crowdsourcing");
    module.factory("listingService", listingService);

}());
