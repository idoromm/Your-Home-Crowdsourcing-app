


function reportListing() {
    sweetAlert("Thank you!", "This listing has been reported", "success");

}

var myPix = new Array("images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg");
function chooseRandomPic() {
    /* randomly selects a picture of the listing to prompt the user with when he enters */
    var randomNum = Math.floor(Math.random() * myPix.length);
    var picSelected = myPix[randomNum];
    return picSelected;
}

var numberOfItemsToFind = 3;

Question.find({}, { '_id': 1}, function(err, data){
    if (err) res.send(err);
    var arr = shuffle.(data.slice(0));
    arr.splice(numberOfItemsToFind, arr.length - numberOfItemsToFind);
    var return_arr = [];
    async.each(arr, function(item, callback){
        Question.findById(item._id, function(err, data){
            if (err) res.send(err);
            return_arr.push(data);

            callback();
        });
    }, function(err){
        res.json(return_arr);
    });
});


/* usage of SweetAlert to display a random image to the user after 5 seconds */
function alertPrompt() {
    setTimeout(function () {
        sweetAlert({
                title: "Is this room furnished?",
                imageUrl: chooseRandomPic(),
                imageSize: '600x600',
                showCancelButton: true,
                cancelButtonText: "No",
                confirmButtonColor: "#00ff00", // green
                confirmButtonText: "Yes",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count++)
                }
                else {
                    sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count--)
                }
            });
    }, 5000); // 5 seconds
}

//(function () {
//    var questionService = function ($http) {
//        var getQuestion = function (url) {
//            return $http.get("http://localhost:3000" + url)
//                .then(function (response) {
//                    return response.data;
//                });
//        };
//
//        return {
//            getQuestion: getQuestion
//        };
//
//    };
//
//    var module = angular.module("Crowdsourcing");
//    module.factory("QuestionService", questionService);
//
//}());


