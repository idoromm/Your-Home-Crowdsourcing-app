var app = angular.module('Crowdsourcing', ['ngRoute'], function ($locationProvider) {
    /* necessary to get the current url */
    $locationProvider.html5Mode(true);
});

/* a function that returns -1 if object is NOT in array, and the objects' index if it IS in the array */
var indexOf = function (needle) {
    if (typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (needle) {
            var i = -1, index = -1;

            for (i = 0; i < this.length; i++) {
                if (this[i] === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }
    return indexOf.call(this, needle);
};

app.controller('ListingController', function ($scope, $location, $http, $q, fileUpload, UserService) {

    var userPromise = UserService.setUser();

    $scope.handle_comment = function (comment) {
        userPromise.then(function (userObj) {
            $http.post("/api/user/" + userObj._id + "/" + "1"); // add 1 to the users' reputation for commenting on a listing
        });
    };

    $scope.changeRoute = function (url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };

    //user getter async
    //every time you need to get the user, inorder to be sure the async
    //function return wrap it like that:
    //
    //userPromise.then(function (userObj) {
    //	==user code here==
    // functions you can call currently in this scope:
    //	userObj => DB object of user
    //	UserService.getUserPoints(); => returns user reputation( int)
    //	UserService.getUserName(); => returns user name(string)
    //}


    //get current url to get relevant listing
    //returns relative path => /listing/
    var path = $location.path();
    //request from server
    var listingPromise = $http.get("/api" + path);

    $q.when(listingPromise,
        function success(listing_info) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.listing = listing_info.data;

            $scope.renovated = $scope.listing.renovated == true ? "Yes" : "No";
            $scope.airConditioning = $scope.listing.airConditioning == true ? "Yes" : "No";
            $scope.elevator = $scope.listing.elevator == true ? "Yes" : "No";
            $scope.balcony = $scope.listing.balcony == true ? "Yes" : "No";
            //This should get us all the listings' images and put them inside $scope.images so we
            //can easily access them in the single.html page by doing {{ images }} or similarly ..
            //Edited By Lior: as  $http.get is Async function we can be sure only here that listing_info
            //is defined.
            fileUpload.getUploadedFilesAsync($scope.listing._id).then(function (images) {
                var listing_images = [];
                for (var i = 0; i < images.length; i++) {
                    listing_images[i] = '../../../' + images[i];
                }
                $scope.images = listing_images;
            });

        }, function error(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.error = "Could not fetch the listing";
        });

    var user = null;

    userPromise.then(function (userObj) {
        $scope.currentUser = userObj;
    });

    /* implements the functionality of the crowd-sourcing aspect of the listing:
     * 1. prompts the user with a random image of the listing
     * 2. asks the user a question about that image
     * 3. updates the DB with the users' input */
    var alertPrompt = function () {

        $q.all([userPromise, listingPromise]).then(function (values) {
            console.log(values); // values[0] = user , values[1] = listing
            var questions = $http.get('/api/questions');
            var questionsUserAlreadyAnswered = $http.get('/api/listing/getQuestionsOfUserInListing/' + values[0]._id + '/' + values[1].data._id);
            var user = values[0];


            $q.all([questions, questionsUserAlreadyAnswered]).then(function (values) {
                /* We find what question the user was asked, and updated the listing parameters accordingly *
                 /  the formula we use is: ((number of people that replied YES) / (number of people that answered at all)) * 100
                 */

                $scope.crowd_furnished_total = $scope.listing.crowd_furnished_total == 0 ? 0 : $scope.listing.crowd_furnished_total;
                $scope.crowd_renovated_total = $scope.listing.crowd_renovated_total == 0 ? 0 : $scope.listing.crowd_renovated_total;
                $scope.crowd_windows_total = $scope.listing.crowd_windows_total == 0 ? 0 : $scope.listing.crowd_windows_total;
                $scope.crowd_light_total = $scope.listing.crowd_light_total == 0 ? 0 : $scope.listing.crowd_light_total;

                $scope.crowd_furnished_votes = $scope.crowd_furnished_total  == 1 ? 'vote' : 'votes';
                $scope.crowd_renovated_votes = $scope.crowd_renovated_total  == 1 ? 'vote' : 'votes';
                $scope.crowd_windows_votes = $scope.crowd_windows_total  == 1 ? 'vote' : 'votes';
                $scope.crowd_light_votes = $scope.crowd_light_total  == 1 ? 'vote' : 'votes';

                $scope.listing.crowd_furnished_total  = $scope.listing.crowd_furnished_total == 0 ? 1 : $scope.listing.crowd_furnished_total;
                $scope.listing.crowd_windows_total = $scope.listing.crowd_windows_total == 0 ? 1 : $scope.listing.crowd_windows_total;
                $scope.listing.crowd_renovated_total = $scope.listing.crowd_renovated_total == 0 ? 1 : $scope.listing.crowd_renovated_total;
                $scope.listing.crowd_light_total = $scope.listing.crowd_light_total == 0 ? 1 : $scope.listing.crowd_light_total;


                $scope.crowd_furnished = ($scope.listing.crowd_furnished / $scope.listing.crowd_furnished_total) * 100; // "Is this room furnished?"
                $scope.crowd_windows = ($scope.listing.crowd_windows / $scope.listing.crowd_windows_total) * 100; // "Is there a window in this room?"
                $scope.crowd_renovated = ($scope.listing.crowd_renovated / $scope.listing.crowd_renovated_total) * 100; // "Does this room look renovated?"
                $scope.crowd_light = ($scope.listing.crowd_light / $scope.listing.crowd_light_total) * 100; // "Is this room well-lit?"

                $scope.crowd_furnished = Math.round($scope.crowd_furnished * 100) / 100;
                $scope.crowd_windows = Math.round($scope.crowd_renovated * 100) / 100;
                $scope.crowd_light = Math.round($scope.crowd_light * 100) / 100;
                $scope.crowd_windows = Math.round($scope.crowd_windows * 100) / 100;

                /* function that sets the question that the user will be asked (only a question he wasn't asked before!)
                 * TODO: need to test if this actually works -> does it return a question really? */
                function setQuestion() {
                    var q; // index of the question we will eventually ask the user
                    for (q in values[0].data) {
                        if (values[1].data.indexOf(values[0].data[q]._id) == -1) {
                            /* the user has NOT answered this question yet -> so we can ask him now! */
                            $scope.title = values[0].data[q].description;
                            $scope.questionToAsk = values[0].data[q];
                            return;
                        }
                    }
                    $scope.title = 'None';
                    $scope.questionToAsk = 'None';
                }

                setQuestion();

                function chooseRandomPic() {
                    // var myPix = ["images/ss1.jpg", "images/ss2.jpg", "images/ss3.jpg"];
                    var randomNum = Math.floor(Math.random() * $scope.images.length);
                    return $scope.images[randomNum];
                }

                /* if the user was asked all the questions already we don't want to ask him again, so we just don't ask him anything
                 * also if the listing doesn't have any images attached to it */
                if ($scope.title.localeCompare('None') != 0 && $scope.images.length != 0) {
                    setTimeout(function () {
                        sweetAlert({
                                title: $scope.title,
                                imageUrl: chooseRandomPic(),
                                imageSize: '450x650',
                                showCancelButton: true,
                                cancelButtonText: "No",
                                confirmButtonColor: "#00ff00", // green
                                confirmButtonText: "Yes",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                            function (isConfirm) {
                                userPromise.then(function (userObj) {
                                    $http.post("/api/user/" + userObj._id + "/" + "3"); // add 3 reputation points to the user for answering a question

                                    /* here we update the DB -> we update 2 different Schemas ->
                                     * 1. the userSchema -> we update the ApartmentsAndQuestions field and add this listing and the question that was asked
                                     * 2. the listingSchema -> we update the UsersAndQuestions field and add this user and the question that was asked
                                     * This way we are "fully updated" and we can access the information through the listing OR the user (or both..) */
                                    $http.put('/api/user/addListingAndQuestionToUser/' + user._id + '/' + $scope.listing._id + '/' + $scope.questionToAsk._id);
                                    $http.put('/api/listing/addUserAndQuestionToListing/' + user._id + '/' + $scope.listing._id + '/' + $scope.questionToAsk._id);
                                    if (isConfirm) {
                                        sweetAlert("Thanks!", "Your input will help others", "success");
                                        if (!($scope.questionToAsk._id.localeCompare('5661da7e716f675817f9d68b'))) { // Furnished
                                            $http.put('/api/listing/changeCrowdFurnishedPercentage/' + $scope.listing._id + '/plus');
                                        }
                                        else if (!($scope.questionToAsk._id.localeCompare('5661db59b0b1b91c1d63643d'))) { // Windows
                                            $http.put('/api/listing/changeCrowdWindowsPercentage/' + $scope.listing._id + '/plus');
                                        }
                                        else if (!($scope.questionToAsk._id.localeCompare('5661db6cb0b1b91c1d63643e'))) { // Renovated
                                            $http.put('/api/listing/changeCrowdRenovatedPercentage/' + $scope.listing._id + '/plus');
                                        }
                                        else if (!($scope.questionToAsk._id.localeCompare('5669d90a058ceddc158e97e2'))) { // Light
                                            $http.put('/api/listing/changeCrowdLightPercentage/' + $scope.listing._id + '/plus');
                                        }
                                        else {
                                            console.log("The ID of the question didn't match any known ID, we go the following ID: " + $scope.questionToAsk._id);
                                        }
                                    }
                                    else {
                                        sweetAlert("Thanks!", "Your input will help others", "success");
                                        if (!($scope.questionToAsk._id.localeCompare('5661da7e716f675817f9d68b'))) { // Furnished
                                            $http.put('/api/listing/changeCrowdFurnishedPercentage/' + $scope.listing._id + '/minus');
                                        }
                                        else if (!($scope.questionToAsk._id.localeCompare('5661db59b0b1b91c1d63643d'))) { // Windows
                                            $http.put('/api/listing/changeCrowdWindowsPercentage/' + $scope.listing._id + '/minus');
                                        }
                                        else if (!($scope.questionToAsk._id.localeCompare('5661db6cb0b1b91c1d63643e'))) { // Renovated
                                            $http.put('/api/listing/changeCrowdRenovatedPercentage/' + $scope.listing._id + '/minus');
                                        }
                                        else if (!($scope.questionToAsk._id.localeCompare('5669d90a058ceddc158e97e2'))) { // Light
                                            $http.put('/api/listing/changeCrowdLightPercentage/' + $scope.listing._id + '/minus');
                                        }
                                        else {
                                            console.log("The ID of the question didn't match any known ID, we go the following ID: " + $scope.questionToAsk._id);
                                        }
                                    }
                                });
                            });
                    }, 5000); // 5 seconds
                }
            })
        });
    };

    $scope.hide = false;

    /* report the listing functionality
     * TODO: need to add functionality to what actually happens if the listing gets reported X number of times */
    $scope.reportListing = function () {
        userPromise.then(function (userObj) {

            /* check if the user has reported this listing before */
            if (indexOf.call($scope.listing.reportedUsersIDs, $scope.currentUser._id) > -1) {
                sweetAlert("Error", "You have already reported this listing", "error");
            }

            /* the user has not reported this listing yet -> report it*/
            else {
                /* add this user to the reportUsers for this listing */
                $http.put("/api/listing/addReportedUser/" + userObj._id + "/" + $scope.listing._id);
                $http.post("/api/user/" + userObj._id + "/" + "1"); // add 1 reputation to the user for reporting a listing

                $http.put("/api" + path + "/incrementFlagCount").success(function () {
                    $scope.hide = true;
                    sweetAlert({
                        title: "Thank you!",
                        text: "This listing has been reported",
                        type: "success"
                    }, function () {
                        $scope.hide = true;
                        //sweetAlert("Listing deleted", "You are being redirected");
                    });
                    /* delete a listing if it was flagged more than 4 times */
                    if (($scope.listing.flagCount + 1) > 4) {
                        $http.delete("/api/listing/" + $scope.listing._id);
                        $scope.changeRoute('/');
                    }
                });
            }
        });
    };
    alertPrompt(); // activate the timer (wait a few seconds until the user is prompted)
});





