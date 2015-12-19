app.directive('crowdFileModel', ['$parse', 'fileService', function ($parse, fileService) {
		return {
			restrict: 'A',
			link: function (scope, element) {
				element.bind('change', function () {
					scope.$apply(function () {
						if (element[0].files != undefined) {
							for (var key in element[0].files) {
								if (element[0].files.hasOwnProperty(key)){									
									fileService.push(element[0].files[key]);
								}
							}

						}
					});
				});
			}
		};
	}]);