/**
 * Created by Ido on 28/11/2015.
 */

(function() {
    angular.module('listingPage', []).controller('ListingCtrl', function($scope) {

        $scope.images = {
            src1: 'images/ss.jpg',
            src2: 'images/ss1.jpg',
            src3: 'images/ss2.jpg',
            src4: 'images/ss3.jpg'
        };
    /*    $scope.id = $routeParams.id;
        $http.get('data.json').success(function (data) {
            $scope.mainData = data[$scope.id].images;
        });

        */

    /*    $http.get('/api/user').success(function (response) {
            $scope.User = response;
        });
        */

        var vm = this;
        vm.yourhome = 'YOUR HOME';
    });
}());