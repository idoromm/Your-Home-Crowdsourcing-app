

//This is a help Service to keep the user info insteed of going to
//to server and asking for the user info every time.
//once user is logged in
app.service('UserService', ['$http','$q', function ($http,$q) {
		
		// params to get once user is loged in
		//private
		var _userObj = null;
		var _name = "";
		var _points = 0;
		
		//keep
		var isInitialized = false;
		
		//public api
		this.getUserName = function () {
			return _name;
		}
		
		this.getUserPoints = function () {
			return _points;
		}
		
		this.getUserObj = function () {
			return _userObj;
		}
		
		
		//get the user
		//once called first time, should not be called again till the next logout
		//assumed this Service is used only when user is logged in.
		//in navCtrl, listingCtrl, etc..
		this.setUser = function () {
			var deferred = $q.defer();
			console.log(isInitialized);
			if (_userObj == null) {
				console.log("inside not inited");
				
				$http.get('/api/user').success(function (user) {
					_userObj = user;
					_points = user.reputation;
					if (user.facebook) {
						_name = user.facebook.firstName;
					} else if (user.google) {
						if (user.google.firstName) {
							_name = user.google.firstName;
						} else {
							_name = user.google.name;
						}
					} else {
						_name = user.local.name;
					}
					
					deferred.resolve(user);
				}).
			error(function (response) {
					deferred.reject(status);
				});
			} else {
				console.log(_userObj);
				deferred.resolve(_userObj);
			}

			
			return deferred.promise;
		};
		

		this.logoutUser = function () {
			//reset all vars
			_userObj = null;
			_name = "";
			_points = 0;
			
			//call the sever logout
			$http.get('/logout');
		};


}]);