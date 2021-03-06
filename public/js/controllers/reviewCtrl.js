app.controller('reviewCtrl',
    function reviewCtrl($scope, $modalInstance, fileService, reviewService, fileUpload, UserService, data) {
		
		$scope.result1 = '';
		$scope.options1 = null;
		$scope.details1 = '';

		var userPromise = UserService.setUser();

        var onListingComplete = function(response) {
			//edited by Lior:: swal message now is in fileUploadService which means that
			//once images uploads succeeded the correct message will be shown.
			//the data is uploaded in 2 phases=> first : json with all text data
			//second=> using the id of the response=> uploading the files with that id
			//upload images once listing uploading was successful
			fileUpload.uploadFileToUrl(fileService, "/api/images/"+response._id);
			fileService = [];

        };

        var onError = function(reason) {
            //$scope.error = "Could not fetch the listing";
        };


        $scope.review = reviewService.review;

		$scope.editableReview = angular.copy($scope.review);

        $scope.askForReview = false;
	
		if (data != null) {
			$scope.askForReview = true;

			var city = data.city;
			var street = data.street;
			var buildingNumber = data.buildingNumber;
			var apartmentNumber = data.apartmentNumber;
			$scope.googleMapsFormDetails = data;
            $scope.editableReview=data;
			$scope.googleMapsFormDetails.route = street;
			$scope.googleMapsFormDetails.locality = city;
			$scope.googleMapsFormDetails.street_number = buildingNumber;
            $scope.editableReview.apartmentNumber =apartmentNumber;
            $scope.googleMapsFormDetails.latitude = data.latitude;
			$scope.googleMapsFormDetails.longitude = data.longitude;
			$scope.autocomplete = city;


		}
        console.log("askForReview: "+ $scope.askForReview );

        var isValidForm = function(){
            //TODO:check that that the requested form is filled with all the details and return boolean
            return true;
        };

        $scope.submitForm = function () {
            $scope.$broadcast('show-errors-event');

            if ($scope.reviewForm.$invalid) {
                sweetAlert("Oops...", "Please fill all the missing details!", "error");
                return;
			}
		
		//upload details
		userPromise.then(function (userObj) {
			reviewService.insertReview($scope.editableReview, $scope.googleMapsFormDetails, $scope.askForReview, userObj._id, UserService.getUserName())
			.then(onListingComplete, onError);
		});



            $scope.review = angular.copy($scope.editableReview);
            $modalInstance.close();
        };
        $scope.submitAskForm = function () {
            console.log("submitAskForm");
            $scope.$broadcast('show-errors-event');

            if ($scope.reviewForm.$invalid) {
                sweetAlert("Oops...", "Please fill all the missing details!", "error");
                return;
			}
				
			reviewService.insertAskReview($scope.editableReview, $scope.googleMapsFormDetails, $scope.askForReview).then(onListingComplete, onError);

        };

        $scope.cancelForm = function () {
            $modalInstance.dismiss();
        };

    });
