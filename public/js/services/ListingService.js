(function(){
    //var basicConfiguration = require('./basicConfiguration'); // use this one for testing

    var listingService = function($http){
        var getListing = function(url){
            return $http.get("http://localhost:3000"+url)
                .then(function(response){
                    return response.data;
                });
        };

        return {
            getListing: getListing,
        };

    };

    var module = angular.module("Crowdsourcing");
    module.factory("listingService", listingService);

}());
