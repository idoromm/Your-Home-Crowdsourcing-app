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

        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
        };

        var  fillInAddress = function() {
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();

            for (var component in componentForm) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
            }

            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    document.getElementById(addressType).value = val;
                }
            }
        }

        $scope.parsedGoogleDetails=function () {
            for (var i = 0; i < googleMapsFormDetails.address_components.length; i++) {
                var addressType = googleMapsFormDetails.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    document.getElementById(addressType).value = val;
                }
            }
        }


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
