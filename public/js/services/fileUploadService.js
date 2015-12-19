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
			})
			.error(function () {
			});
	}
}]);