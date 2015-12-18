app.factory('reviewService',
    function ($http) {

        var insertReview = function(listing,googleMapsAddress){
            var data=JSON.stringify(({"latitude":googleMapsAddress.geometry.location.lat(),"longitude":googleMapsAddress.geometry.location.lng(),"country":googleMapsAddress.country,"city":googleMapsAddress.locality,"street":googleMapsAddress.route,"buildingNumber":googleMapsAddress.street_number,"apartmentNumber":listing.apartmentNumber,"type":listing.type,"floor":listing.floor,"outOfFloors":listing.outOfFloors,"size":listing.size,
                "numberOfRooms":listing.rooms,"renovated":listing.renovated,"elevator":listing.elevator,"airConditioning":listing.airConditioning,"balcony":listing.balcony,"price":listing.price,"description":listing.description}));
            return $http.post("/api/listing",data)
                .then(function(response){
                    return response.data;
                });
        };

        return {
            insertReview: insertReview
        };
    });