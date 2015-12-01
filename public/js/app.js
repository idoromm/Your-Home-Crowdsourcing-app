(function(){

    var app = angular.module("Crowdsourcing", []);

    app.config(function($routeProvider){
        $routeProvider
            .when("/single", {
                templateUrl: "/views/single.html'",
                controller: "ListingCtrl"
            })
            .when("/single/:street/:buildingNumber/:apartmentNumber", {
                templateUrl: "/views/single.html'",
                controller: "ListingCtrl"
            })
            .otherwise({redirectTo:"/"});
    });

}());


