app.factory('reviewService',
    function () {

        var insertReview = function(newReview){
          return true;
        };

        return {
            insertReview: insertReview
        };
    });