var User = require('./models/user');
var Listing = require('./models/listing');
var AskListing = require('./models/askListing');

var Question = require('./models/question');
var QuestionHandler = require('./QuestionHandler');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');
var multer = require('multer');

var uploadfFolder = __dirname + '/../public/uploads';

//handling storage of files
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var destFolder = uploadfFolder + '/' + req.params.id;
        //create folder if does not exists
        if (!fs.existsSync(destFolder)) {
            fs.mkdirSync(destFolder);
        }

        //set folder where files will be populated
        cb(null, destFolder)
    },
    filename: function (req, file, cb) {
        //set the names file within the folder
        //as the original name of the file
        cb(null, file.originalname);
    }
});


var upload = multer({storage: storage});


module.exports = function (app, passport) {

    //===================================================
    //DB api
    //*****Comment by Lior*****
    // next 2 functions are not needed. passport sets all  users
    //and transfer
    //users in the following way: req.user
    //please add here all details you need from user to
    //add to sign up form:
    //1. add name form for sign up. - Done
    //===================================================


    app.get('/api/userName', isLoggedIn, function (req, res) {

        // didn't find a better way to make it work
        var userStr = JSON.stringify(req.user);
        var userJson = JSON.parse(userStr);

        //return name
        if (userJson.facebook) {
            res.send(userJson.facebook.firstName);
        } else if (userJson.google) {

            User.findOne({'google.email': userJson.google.email}, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    var userStr = JSON.stringify(user.google);
                    var userJson = JSON.parse(userStr);
                    if (userJson.firstName) {
                        //old users (Us)
                        res.send(userJson.firstName);
                    } else {
                        res.send(userJson.name);
                    }
                }
            });
        } else {
            res.send(userJson.local.name);
        }
    });
    /* TODO: Lior: this does not seem to work.. */
    app.get('/api/user', function (req, res) {
        if (req.user) {
            res.json(req.user);
        } else {
            res.json("");
        }
    });

    /* gets a question with id = _id */
    app.get('/api/questions/:_id', function (req, res) {
        //console.log("Question API");
        Question.find(
            {"_id": req.params._id}
            , function (err, question) {
                //console.log("Question: " + question);
                res.json(question[0]);
            });
    });

    /* add a new question with description in url */
    app.post('/api/questions', function (req, res) {
        var description = req.body.description;
        var question = new Question({description: description});
        question.save(function (err, question) {
            if (err) return handleError(err);
            res.json({description: question.description});
        });
    });

    /* changing a users' reputation by user id in amount = :amount */
    app.post('/api/user/:userid/:amount', function (req, res) {
        //console.log("changing reputation of user now");
        mongoose.model('User').findOneAndUpdate({
                _id: req.params.userid
            }, {$inc: {reputation: req.params.amount}}
            , function (err, user) {
                if (err) {
                    res.send("There was a problem changing the reputation of this  user: " + err);
                }
                else {
                    res.send("Successful changing users' reputation!")
                }
            })
    });

    /* increment flagCount of a certain listing by  1 */
    app.put('/api/listing/:street/:buildingNumber/:apartmentNumber/incrementFlagCount', function (req, res) {
        //console.log("incrementing flag count now");
        mongoose.model('Listing').findOneAndUpdate({
                street: req.params.street,
                buildingNumber: req.params.buildingNumber,
                apartmentNumber: req.params.apartmentNumber
            }, {$inc: {flagCount: 1}}
            , function (err, listing) {
                if (err) {
                    res.send("There was a problem incrementing the flagCount of a listing: " + err);
                }
                else {
                    //console.log("Flag count after=" + listing.flagCount);
                    res.json(listing.flagCount);
                }
            })
    });

    /* updates the renovated parameter of a certain listing */
    app.put('/api/listing/changeCrowdRenovatedPercentage/:listingid/:plusOrMinus', function (req, res) {
        var listing = req.params.listingid;
        var plusOrMinus = req.params.plusOrMinus;
        plusOrMinus = (plusOrMinus == 'plus' ? 1 : 0);

        mongoose.model('Listing').update({
                _id: ObjectId(listing)
            }, {$inc: {crowd_renovated_total: 1, crowd_renovated: plusOrMinus}}
            , function (err, listing) {
                if (err) {
                    res.send("There was a problem updating the renovated parameter: " + err);
                }
                else {
                    res.json(listing.crowd_renovated_total);
                }
            })
    });
    /* updates the furnished parameter of a certain listing */
    app.put('/api/listing/changeCrowdFurnishedPercentage/:listingid/:plusOrMinus', function (req, res) {
        var listing = req.params.listingid;
        var plusOrMinus = req.params.plusOrMinus;
        plusOrMinus = (plusOrMinus == 'plus' ? 1 : 0);

        mongoose.model('Listing').update({
                _id: ObjectId(listing)
            }, {$inc: {crowd_furnished_total: 1, crowd_furnished: plusOrMinus}}
            , function (err, listing) {
                if (err) {
                    res.send("There was a problem updating the furnished parameter: " + err);
                }
                else {
                    res.json(listing.crowd_furnished_total);
                }
            })
    });
    /* updates the windows parameter of a certain listing */
    app.put('/api/listing/changeCrowdWindowsPercentage/:listingid/:plusOrMinus', function (req, res) {
        var listing = req.params.listingid;
        var plusOrMinus = req.params.plusOrMinus;
        plusOrMinus = (plusOrMinus == 'plus' ? 1 : 0);

        mongoose.model('Listing').update({
                _id: ObjectId(listing)
            }, {$inc: {crowd_windows_total: 1, crowd_windows: plusOrMinus}}
            , function (err, listing) {
                if (err) {
                    res.send("There was a problem updating the windows parameter: " + err);
                }
                else {
                    res.json(listing.crowd_windows_total);
                }
            })
    });
    /* updates the light parameter of a certain listing */
    app.put('/api/listing/changeCrowdLightPercentage/:listingid/:plusOrMinus', function (req, res) {
        var listing = req.params.listingid;
        var plusOrMinus = req.params.plusOrMinus;
        plusOrMinus = (plusOrMinus == 'plus' ? 1 : 0);

        mongoose.model('Listing').update({
                _id: ObjectId(listing)
            }, {$inc: {crowd_light_total: 1, crowd_light: plusOrMinus}}
            , function (err, listing) {
                if (err) {
                    res.send("There was a problem updating the light parameter: " + err);
                }
                else {
                    res.json(listing.crowd_light_total);
                }
            })
    });


    /* add current user ID to listing reporters */
    app.put('/api/listing/addReportedUser/:userid/:listingid', function (req, res) {
        //console.log("adding reported user now");
        var listingToUpdate = req.params.listingid;
        var idToAdd = req.params.userid;
        Listing.update({_id: ObjectId(listingToUpdate)},
            {$addToSet: {reportedUsersIDs: ObjectId(idToAdd)}}
            , function (err, listing) {
                if (err) {
                    res.send("There was a problem adding the reportedUserID to the listing" + err);
                }
                else {
                    //console.log("Success adding reportedUserID to listing!");
                    //res.json(listing);
                    ;
                }
            })
    });

    /* adds a users' input (answer) of a certain question to a listing */
    app.put('/api/listing/addUserAndQuestionToListing/:userid/:listingid/:questionid', function (req, res) {
        //console.log("adding user and question he answered to listing schema");
        var listingToUpdate = req.params.listingid;
        var idToAdd = req.params.userid;
        var questionToAdd = req.params.questionid;
        Listing.update({_id: ObjectId(listingToUpdate), 'UsersAndQuestions.userID': ObjectId(idToAdd)},
            {"$addToSet": {"UsersAndQuestions.$.questionID": questionToAdd}}
            , function (err, result) {
                if (result.n === 0) {
                    //we haven't found document with the userId - idToAdd
                    //we need to insert to UsersAndQuestions document with this user
                    Listing.update({_id: ObjectId(listingToUpdate)},
                        {
                            $addToSet: {
                                UsersAndQuestions: {
                                    userID: ObjectId(idToAdd),
                                    questionID: ObjectId(questionToAdd)
                                }
                            }
                        },
                        function (err, res) {
                            // res.send("Successful in adding a user and question to the questions' UsersAndQuestions!");
                            //res.json(result);
                        })
                }
            });
    });

    /* get the questions that a user was asked in a specific listing */
    app.get('/api/listing/getQuestionsOfUserInListing/:userid/:listingid', function (req, res) {
        var user = req.params.userid;
        var listing = req.params.listingid;
        Listing.findOne({_id: listing, 'UsersAndQuestions.userID': user},
            {_id: 0, 'UsersAndQuestions.$': 1},
            function (err, result) {
                res.json((result === null || result === undefined) ? [] : result.UsersAndQuestions[0].questionID);
                //   res.json(result.UsersAndQuestions[0].questionID);
            });
    });

    /* get the questions that a user was asked in a specific listing */
    app.get('/api/user/getQuestionsOfUserInListing/:userid/:listingid', function (req, res) {
        var user = req.params.userid;
        var listing = req.params.listingid;
        User.findOne({_id: user, 'ApartmentsAndQuestions.apartmentID': listing},
            {_id: 0, 'ApartmentAndQuestions.$': 1},
            function (err, result) {
                res.json((result === null || result === undefined) ? [] : result.ApartmentsAndQuestions[0].questionID);
            });
    });


    /* deletes a listing from the database */
    app.delete('/api/listing/:listingid', function (req, res) {
        var listingToDelete = req.params.listingid;
        Listing.remove(
            {_id: ObjectId(listingToDelete)},
            function (err, result) {
                res.send("successful in deleting the listing!")
            }
        );
    });

    /* adds a listing and a question answered by the user to the users' schema */
    app.put('/api/user/addListingAndQuestionToUser/:userid/:listingid/:questionid', function (req, res) {
        //console.log("adding listing and question answered to user schema");

        var listingToAdd = req.params.listingid;
        var userToUpdate = req.params.userid;
        var questionToAdd = req.params.questionid;
        User.update({_id: ObjectId(userToUpdate), 'ApartmentsAndQuestions.apartmentID': ObjectId(listingToAdd)},
            {"$addToSet": {"ApartmentsAndQuestions.$.questionID": questionToAdd}}
            , function (err, result) {
                if (result.n === 0) {
                    //we haven't found document with the apartmentID - listingToAdd
                    //we need to insert to ApartmentsAndQuestions document with this listing
                    User.update({_id: ObjectId(userToUpdate)},
                        {
                            $addToSet: {
                                ApartmentsAndQuestions: {
                                    apartmentID: ObjectId(listingToAdd),
                                    questionID: ObjectId(questionToAdd)
                                }
                            }
                        },
                        function (err, res) {
                            //   res.send("Successful in adding a listing and question to the users ApartmentsAndQuestions!");
                            // res.json(result);
                        })
                }
            });
    });

    /* get an array of ALL the questions in the database */
    app.get('/api/questions', function (req, res) {
        Question.find(function (err, questions) {
            if (err)
                res.send(err);
            //console.log(questions);
            res.json(questions);
        });
    });


    app.get('/api/getrandomquestion', function (req, res) {
        QuestionHandler.getRandomQuestion(res);
    });

    app.get('/api/getrandompic', function (req, res) {
        QuestionHandler.chooseRandomPic(res);
    });

    app.get('/api/listings', function (req, res) {
        // use mongoose to get all listings in the database
        Listing.find(function (err, listings) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            //console.log(listings);
            res.json(listings); // return all in JSON format
        });
    });

    app.post('/api/images/:id', upload.array('file'), function (req, res) {
        //storage is handles by multer in middleware function => 'upload'
        res.send(req.params.id);
    });

    app.get('/api/images/:id', function (req, res) {
        var imagesList = [];
        if (fs.existsSync(uploadfFolder + '/' + req.params.id)) {
            var files = fs.readdirSync(uploadfFolder + '/' + req.params.id);
            for (var i in files) {
                imagesList.push('/uploads/' + req.params.id + '/' + files[i]);
            }
        }
        res.json(imagesList);
    });


    app.post('/api/listing', function (req, res) {
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var country = req.body.country;
        var city = req.body.city;
        var street = req.body.street;
        var buildingNumber = req.body.buildingNumber;
        var apartmentNumber = req.body.apartmentNumber;
        var type = req.body.type;
        var floor = req.body.floor;
        var outOfFloors = req.body.outOfFloors;
        var numberOfRooms = req.body.numberOfRooms;
        var size = req.body.size;
        var renovated = req.body.renovated == undefined ? false : req.body.renovated;
        var elevator = req.body.elevator == undefined ? false : req.body.elevator;
        var airConditioning = req.body.airConditioning == undefined ? false : req.body.airConditioning;
        var balcony = req.body.balcony == undefined ? false : req.body.balcony;
        var price = req.body.price;
        var description = req.body.description;
		var ownerID = req.body.ownerID;
		var ownerName = req.body.ownerName;
        var askForReview = req.body.askForReview;

        var listing = new Listing({
            "latitude": latitude,
            "longitude": longitude,
            "country": country,
            "city": city,
            "street": street,
            "buildingNumber": buildingNumber,
            "apartmentNumber": apartmentNumber,
            "type": type,
            "floor": floor,
            "outOfFloors": outOfFloors,
            "numberOfRooms": numberOfRooms,
            "size": size,
            "renovated": renovated,
            "elevator": elevator,
            "airConditioning": airConditioning,
            "balcony": balcony,
            "price": price,
            "description": description,
			"ownerID": ownerID,
			"ownerName":ownerName,
            "askForReview": askForReview
        });
        listing.save(function (err) {
            if (err) throw err;

            mongoose.model('User').findOneAndUpdate({
                    _id: ownerID
                }, {$inc: {reputation: 10}}
                , function () {
                });

            //console.log(listing + ' has been saved successfully!');
            res.json(listing);
        });
    });

    app.get('/api/askListings', function (req, res) {
        // use mongoose to get all listings in the database
        AskListing.find(function (err, askListings) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            //console.log(listings);
            res.json(askListings); // return all nerds in JSON format
        });
    });


    app.post('/api/askListing', function (req, res) {
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var country = req.body.country;
        var city = req.body.city;
        var street = req.body.street;
        var buildingNumber = req.body.buildingNumber;
        var apartmentNumber = req.body.apartmentNumber;


        var askListing = new AskListing({
            "latitude": latitude,
            "longitude": longitude,
            "country": country,
            "city": city,
            "street": street,
            "buildingNumber": buildingNumber,
            "apartmentNumber": apartmentNumber
        });
        askListing.save(function (err) {
            if (err) throw err;

            //console.log(askListing + ' has been saved successfully!');
            res.json(askListing);
        });
    });

// server routes ===========================================================
// handle things like api calls

// frontend routes =========================================================
// route to handle all angular requests

//=====================================================
// Home Page (welcome page for unrecognized users)
//=====================================================

//we add middleware function to let only signed in
// users to go to main page
    app.get('/', isLoggedIn, function (req, res) {
        //console.log("Main Page is loading ...");

        res.sendfile('./public/views/main-page.html');
    });

//main page for users that are unrecognized
    app.get('/welcome', function (req, res) {
        if (req.user) {
            res.redirect('/');
        }
        //console.log("Welcome Page is loading ...");

        //prevent caching to prevent from pressing back button and return to welcome page after log in
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.sendfile('./public/views/welcome.html');
    });


//======================================================
//Login(login form for local login(not facebook,google))
//======================================================

// show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('Signup.ejs', {message: req.flash('loginMessage')});
    });

// process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',		// redirect to the home page
        failureRedirect: '/login', // redirect back to the login page if there is an error
        failureFlash: true			// allow flash messages
    }));

// =====================================================
// FACEBOOK Login
// =====================================================
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

// handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        }));


// ====================================================
// GOOGLE ROUTES
// ====================================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/'
        }));


//======================================================
//Sign Up
//======================================================

// show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

// process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',			// redirect to the secure profile section
        failureRedirect: 'signup',		// redirect back to the signup page if there is an error
        failureFlash: true				// allow flash messages - shows messege for failure
    }));

//======================================================
//Profile Section
//======================================================

// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

//======================================================
//Log Out
//======================================================

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


//======================================================
//Apartment listing
    //======================================================


    app.get('/listing/:street/:buildingNumber/:apartmentNumber', function (req, res) {
        res.sendfile('./public/views/single.html');
    });

    app.get('/single', function (req, res) {
        //console.log("listing page is loading ...");
        res.sendfile('./public/views/single.html');
    });

    app.get('/new', function (req, res) {
        //console.log("new post is loading ...");
        res.sendfile('./public/views/new.html');
    });

    app.get('/api/user/:email', function (req, res) {
        User.findOne({
            $or: [
                {"local.email": req.params.email},
                {"facebook.email": req.params.email},
                {"google.email": req.params.email}
            ]
        }, function (err, user) {
            res.json(user);
        });
    });

    app.get('/api/listing/:street/:buildingNumber/:apartmentNumber/getFlagCount', function (req, res) {
        //console.log("getting flag count now");
        Listing.findOne(
            {
                "street": req.params.street,
                "buildingNumber": req.params.buildingNumber,
                "apartmentNumber": req.params.apartmentNumber
            }
            , function (err, listing) {
                //console.log("Flag count=" + listing.flagCount);
                res.json(listing.flagCount);
            });
    });

    app.get('/api/listing/:street/:buildingNumber/:apartmentNumber', function (req, res) {
        //console.log("Listing API");
        Listing.findOne(
            {
                "street": req.params.street,
                "buildingNumber": req.params.buildingNumber,
                "apartmentNumber": req.params.apartmentNumber
            }
            , function (err, listing) {
                //if (err) { return next(err); }
                //console.log("Listing: " + listing);
                res.json(listing);
            });
    });


    app.get('/api/listings', function (req, res, next) {
        Listing.find({}, function (err, listings) {
            if (err) {
                return next(err);
            }
            res.json(listings);
        });
    });


}
; //end export


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the welcomw page
    res.redirect('/welcome');
}
