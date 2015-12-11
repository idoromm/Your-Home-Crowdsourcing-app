/**
 * Created by Ido on 04/12/2015.
 */
var app = angular.module('Crowdsourcing', []);

app.controller('QuestionCtrl', function ($scope, $http) {	
	
	var alertPrompt = function () {
		var title = ""
		var pic = "";
		
		//get title
		$http.get('/api/getrandomquestion').success(function (question) {
			title = question.description;
		});
		
		//get picture
		$http.get('/api/geteandompic').success(function (picture) {
			//should be chanched to json 
			pic = picture;
		});
		
		setTimeout(function () {
			sweetAlert({
				//	title: "Is this room furnished?",
				title: title,
				imageUrl: pic,
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
		
	};

});