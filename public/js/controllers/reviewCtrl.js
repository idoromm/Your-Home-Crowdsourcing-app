app.controller('reviewCtrl',
    function reviewCtrl($scope, $modalInstance, reviewService) {
        $scope.review = reviewService.review;

        $scope.editableReview = angular.copy($scope.review);

        $scope.submitForm = function () {

            $scope.$broadcast('show-errors-event');

            if ($scope.reviewForm.$invalid)
                return;

            reviewService.insertReview($scope.editableReview);

            $scope.review = angular.copy($scope.editableReview);
            $modalInstance.close();
        };

        $scope.cancelForm = function () {
            $modalInstance.dismiss();
        };

    });
