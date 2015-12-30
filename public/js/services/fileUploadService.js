app.service('fileUpload', ['$http', function ($http) {
		this.uploadFileToUrl = function (files, uploadUrl) {
			
			var fd = new FormData();
			for (var i = 0; i < files.length; i++) {
				fd.append('file', files[i]);
			}

			$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			})
			.success(function (listingId) {
				console.log("images files upload success");
				swal({title : "Your listing has been submitted!",text: "Thank you for your time!", type: "success"},function(){
					location.reload();});


			})
			.error(function () {
				console.log("images files upload fail");
				swal("Images failed to upload!", "Please try again!", "error");
			});


		};

		this.getUploadedFilesAsync = function (listingId){
			
			// $http returns a promise, which has a then function, which also returns a promise
			var promise = $http.get('/api/images/' + listingId).then(function (response) {
				// The then function here is an opportunity to modify the response
				console.log(response);
				// The return value gets picked up by the then in the controller.
				return response.data;
			});
			// Return the promise to the controller
			return promise;
		}
}]);

