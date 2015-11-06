angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/users');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(userData) {
            return $http.post('/api/users', userData);
        },

        // call to DELETE a user
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    }
}]);