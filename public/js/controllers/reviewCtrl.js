app.controller('reviewCtrl',
    function reviewCtrl($scope, $modalInstance, reviewService) {
	
		$scope.result1 = '';
		$scope.options1 = null;
		$scope.details1 = '';

        var onListingComplete = function(response) {
            swal("Your listing has been submited!", "Thank you for your time!", "success")
            //$scope.listing = response;
        };

        var onError = function(reason) {
            //$scope.error = "Could not fetch the listing";
        };

        $scope.review = reviewService.review;

        $scope.editableReview = angular.copy($scope.review);

        $scope.submitForm = function () {

            $scope.$broadcast('show-errors-event');

            if ($scope.reviewForm.$invalid)
                return;

            reviewService.insertReview($scope.editableReview)
                .then(onListingComplete,onError);



            $scope.review = angular.copy($scope.editableReview);
            $modalInstance.close();
        };

        $scope.cancelForm = function () {
            $modalInstance.dismiss();
        };

    });
