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
			.success(function () {
				console.log("images files upload success");
				swal("Your listing has been submitted!", "Thank you for your time!", "success");
			})
			.error(function () {
				console.log("images files upload fail");
				swal("Images failed to upload!", "Please try again!", "error");
			});
	}
}]);