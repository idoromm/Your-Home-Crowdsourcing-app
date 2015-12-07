/**
 * Created by Ido on 04/12/2015.
 */

//var app = angular.module('questions', ['ngRoute', 'ui.bootstrap']);


controller('QuestionCtrl', function ($scope, $http, $modal) {

    $http.get('/api/getrandomquestion').success(function (question) {

    //    $scope.points = user.reputation;
        $scope.description  = question.description;
    //    $scope.message = 'hello';

    });

    $scope.addNewReview = function () {
        ;
        //$modal.open({
        //    templateUrl: 'views/reviewTemplate.html',
        //    controller: 'reviewCtrl',
        //    backdrop: 'static'
        //});
    };
});


//controller('AddImageController', ['$scope', 'Upload', '$modalInstance', '$timeout',
//    function ($scope, Upload, $modalInstance, $timeout) {
//        //$scope.poster = {};
//        //$scope.poster.authors = [];
//        //$scope.poster.slides = [];
//        $scope.images = [];
//
//        //handle slide uploads
//        $scope.add_images = function (event) {
//
//            var files = $scope.files = event.target.files;
//
//
//            for (var i = 0; i < files.length; i++) {
//                var reader = new FileReader();
//
//                var file = files[i];
//                reader.onload = $scope.imageLoaded;
//                reader.readAsDataURL(file);
//            }
//        };
//
//        $scope.imageLoaded = function (e) {
//            //timeout should solve the $digest error
//            //safer than $apply
//            $timeout(function () {
//                var data = e.target.result;
//
//                //data = window.btoa(data);
//
//            //    var order = $scope.poster.slides.length;
//
//                //build a JSON slide object
//                var img = {
//                    image: data
//              //      order: order
//                };
//
//                //add the image to the poster
//           //     $scope.poster.slides.push(slide);
//                $scope.images.push(img);
//            });
//        };
//    }
//]);