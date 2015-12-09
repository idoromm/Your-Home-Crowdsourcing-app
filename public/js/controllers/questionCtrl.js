/**
 * Created by Ido on 04/12/2015.
 */
controller('QuestionCtrl', function ($scope, $http) {

    $http.get('/api/getrandomquestion').success(function (question) {
        $scope.description  = question.description;
    });
});