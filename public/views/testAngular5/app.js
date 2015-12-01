(function(){
    
    var app = angular.module("githubViewer", ["ngRoute"]);
    
    app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "/views/testAngular/main.html",
                controller: "MainController"
            })
            .when("/user/:username", {
                templateUrl: "/views/testAngular/user.html",
                controller: "UserController"
            })
            .when("/repo/:username/:reponame", {
                templateUrl: "/views/testAngular/repo.html",
                controller: "RepoController"
            })
            .otherwise({redirectTo:"/main"});
    });
    
}());