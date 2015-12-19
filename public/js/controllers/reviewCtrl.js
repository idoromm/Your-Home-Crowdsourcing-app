app.controller('reviewCtrl',
    function reviewCtrl($scope, $modalInstance, fileService, reviewService,fileUpload) {
	
		$scope.result1 = '';
		$scope.options1 = null;
		$scope.details1 = '';

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

        var isValidForm= function(){
            //TODO:check that that the requested form is filled with all the details and return boolean
            return true;
        }

        $scope.submitForm = function () {
            $scope.$broadcast('show-errors-event');

            if ($scope.reviewForm.$invalid) {
                sweetAlert("Oops...", "Please fill all the missing details!", "error");
                return;
			}
		
			//upload details
			reviewService.insertReview($scope.editableReview,$scope.googleMapsFormDetails)
				.then(onListingComplete, onError);

            $scope.review = angular.copy($scope.editableReview);
            $modalInstance.close();
        };

        $scope.cancelForm = function () {
            $modalInstance.dismiss();
        };

    });
