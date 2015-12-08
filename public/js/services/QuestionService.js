var Question = require(__base + 'app/models/question');
var async = require('async');

var self = module.exports = {
	
	numberOfItemsToFind: 3,
	
	reportListing: function () {
		sweetAlert("Thank you!", "This listing has been reported", "success");

	},
	
	myPix: new Array("images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg"),
	
	chooseRandomPic: function () {
		/* randomly selects a picture of the listing to prompt the user with when he enters */
		var randomNum = Math.floor(Math.random() * myPix.length);
		var picSelected = myPix[randomNum];
		return picSelected;
	},
	
	shuffle: function (array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		
		return array;
	},

	getRandomQestion: function (res) {
		Question.find({}, { '_id': 1 }).lean().exec(function(err,data) {
			if (err) {
				console.log(err);
				res.send("");
			};
			var arr = self.shuffle(data.slice(0));
			arr.splice(self.numberOfItemsToFind, arr.length - self.numberOfItemsToFind);
			var return_arr = [];
			async.each(arr, function (item, callback) {
				Question.findById(item._id, function (err, data) {
					if (err) {
						console.log(err);
						res.send("");
					}
					return_arr.push(data);
					
					callback();
				});
			}, function (err) {
				res.json(return_arr[0]);
			});
		});
	},
	
	
	
	/* usage of SweetAlert to display a random image to the user after 5 seconds */
	alertPrompt: function () {
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

}; //end moudle export


