var Question = require('./models/question');
var async = require('async');

var self = module.exports = {
	
	numberOfItemsToFind: 3,
	
	reportListing: function () {
		sweetAlert("Thank you!", "This listing has been reported", "success");

	},
	
	myPix: ["images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg"],
	
	chooseRandomPic: function () {
		/* randomly selects a picture of the listing to prompt the user with when he enters */
		var randomNum = Math.floor(Math.random() * myPix.length);
		return myPix[randomNum];
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
	
	getRandomQuestion: function (res) {
		Question.find({}, { '_id': 1 }).lean().exec(function (err, data) {
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
	}
	

}; //end moudle export