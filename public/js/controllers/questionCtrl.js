/**
 * Created by Ido on 04/12/2015.
 */
(function() {
    var app = angular.module("Crowdsourcing", []);

    var QuestionController = function($scope,questionService) {

        var onQuestionComplete = function(response) {
            $scope.question = response;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the question(s)";
        };

        questionService.getQuestion("/api/questions")
            .then(onQuestionComplete, onError);
    };

    app.controller("QuestionController", ["$scope","questionService", QuestionController]);

}());