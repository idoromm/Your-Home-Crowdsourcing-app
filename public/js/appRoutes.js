angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // users page that will use the UserController
        .when('/users', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })

        .when('/single/:listingnumber', {
            templateUrl: 'views/single.html',
            controller: 'ListingController'
        })

        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

}]);