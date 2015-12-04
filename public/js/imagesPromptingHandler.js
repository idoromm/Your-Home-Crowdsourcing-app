var http = require('http');

function reportListing() {
    sweetAlert("Thank you!", "This listing has been reported", "success");
}

var myPix = new Array("images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg");
function choosePic() {
    /* randomly selects a picture of the listing to prompt the user with when he enters */
    var randomNum = Math.floor(Math.random() * myPix.length);
    var picSelected = myPix[randomNum];
    return picSelected;
}

/* usage of SweetAlert to display a random image to the user after 5 seconds */
(function () {
    setTimeout(function () {
        sweetAlert({
                title: "Is this room furnished?",
                imageUrl: choosePic(),
                imageSize: '600x600',
                showCancelButton: true,
                cancelButtonText: "No",
                confirmButtonColor: "#00ff00", // green
                confirmButtonText: "Yes",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count++)
                }
                else {
                    sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count--)
                }
            });
    }, 5000); // 5 seconds
}());

function getRandImage(callback) {
    var app = angular.module("Crowdsourcing", []);
    return $http.get({
        host: 'localhost:3000',
        path: '/api/questions'
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var parsed = JSON.parse(body);
            callback({
                _id: parsed._id,
                description: parsed.description
            });
        });
    });
}

(function () {
    var app = angular.module("Crowdsourcing", []);

    var ListingController = function ($scope, listingService) {

        var onListingComplete = function (response) {
            $scope.listing = response;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the user";
        };


        listingService.getListing("/api/listing/Rashi/10/13")
            .then(onListingComplete, onError);
    };

    app.controller("ListingController", ["$scope", "listingService", ListingController]);

}());




