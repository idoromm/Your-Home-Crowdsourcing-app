/**
 * Created by Ido on 04/12/2015.
 */
(function(){
    var questionService = function($http){

        var getQuestion = function(url){
            return $http.get("http://localhost:3000"+url)
                .then(function(response){
                    return response.data;
                });
        };
        return {
            getQuestion: getQuestion
        };

    };

    var module = angular.module("Crowdsourcing");
    module.factory("questionService", questionService);

}());
