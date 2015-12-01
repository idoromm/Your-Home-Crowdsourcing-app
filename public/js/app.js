(function(){

    var app = angular.module("Crowdsourcing", ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/single", {
                templateUrl: "/views/single.html'",
                controller: "ListingCtrl"
            })
            .otherwise({redirectTo:"/"});
    });

}());


