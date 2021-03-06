app.factory('reviewService',
    function ($http) {

	var insertReview = function (listing, googleMapsAddress,askForReview,user_id,user_name) {
		    var lat;
		    var long;
		    if (typeof(googleMapsAddress.geometry) != 'undefined') {
			    lat = googleMapsAddress.geometry.location.lat();
			    lng = googleMapsAddress.geometry.location.lng();
		    } else {
			    lat = googleMapsAddress.latitude;
			    lng = googleMapsAddress.longitude;
		    }

			var data = JSON.stringify(({
				"latitude": lat,
				"longitude": lng,
				"country": googleMapsAddress.country,
				"city": googleMapsAddress.locality,
				"street": googleMapsAddress.route,
				"buildingNumber": googleMapsAddress.street_number,
				"apartmentNumber": listing.apartmentNumber,
				"type": listing.type,
				"floor": listing.floor,
				"outOfFloors": listing.outOfFloors,
				"size": listing.size,
				"numberOfRooms": listing.numberOfRooms,
				"renovated": listing.renovated,
				"elevator": listing.elevator,
				"airConditioning": listing.airConditioning,
				"balcony": listing.balcony,
				"price": listing.price,
				"description": listing.description,
				"ownerID": user_id,
				"ownerName": user_name
			}));

			if (askForReview) {
				var url = "/api/askListing/" + lat + '/' + lng;
				$http.delete(url)
						.then(function (response) {
							console.log(response.data);
						});
			}
			return $http.post("/api/listing", data)
                .then(function (response) {
				return response.data;
			});
		
    };

        var insertAskReview = function (listing, googleMapsAddress){
            console.log("insertAskReview service");
            var data = JSON.stringify(({
                "latitude": googleMapsAddress.geometry.location.lat(),
                "longitude": googleMapsAddress.geometry.location.lng(),
                "country": googleMapsAddress.country,
                "city": googleMapsAddress.locality,
                "street": googleMapsAddress.route,
                "buildingNumber": googleMapsAddress.street_number,
                "apartmentNumber": listing.apartmentNumber
            }));
            return $http.post("/api/AskListing", data)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            insertReview: insertReview,
            insertAskReview: insertAskReview
        };
    });