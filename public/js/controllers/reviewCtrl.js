app.controller('reviewCtrl',
    function reviewCtrl($scope, $modalInstance, reviewService) {
	
		$scope.result1 = '';
		$scope.options1 = null;
		$scope.details1 = '';

        var onListingComplete = function(response) {
            swal("Your listing has been submitted!", "Thank you for your time!", "success")
            //$scope.listing = response;
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

            if (!isValidForm()){
                sweetAlert("Oops...", "Please fill all the missing details!", "error");
                return;
            }
            reviewService.insertReview($scope.editableReview,$scope.googleMapsFormDetails)
                .then(onListingComplete,onError);



            $scope.review = angular.copy($scope.editableReview);
            $modalInstance.close();
        };

        $scope.cancelForm = function () {
            $modalInstance.dismiss();
        };

    });
