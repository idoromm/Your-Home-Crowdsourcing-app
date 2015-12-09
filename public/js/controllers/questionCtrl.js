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
});