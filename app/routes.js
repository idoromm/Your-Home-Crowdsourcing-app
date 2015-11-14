//var User = require('./models/user');

module.exports = function (app, passport) {

    //===================================================
    //DB api
    //*****Comment by Lior*****
    // next 2 functions are not needed. passport sets all  users
    //and transfer
    //users in the following way: req.user
    //please add here all details you need from user to
    //add to sign up form:
    //1. add name form for sign up.
    //===================================================

    app.get('/api/users', function (req, res) {
        // use mongoose to get all users in the database
        User.find(function (err, users) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            console.log(users);
            res.json(users); // return all nerds in JSON format
        });
    });

    app.post('/api/users', function (req, res) {

        var name = req.body.name;
        var user = new User({"name": name});
        user.save(function (err) {
            if (err) throw err;

            console.log(user + ' has been saved successfully!');
            res.json(user);
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
        console.log("Main Page is loading ...");

        res.sendfile('./public/views/main-page.html');
    });

    //main page for users that are unrecognized
    app.get('/welcome', function (req, res) {
        console.log("Main Page is loading ...");

        res.sendfile('./public/views/welcome.html');
    });

    app.get('/enter', function (req, res) {
        console.log("log-in/sign-up page is loading ...");

        res.render('enter.ejs');
    });


    //======================================================
    //Login(login form for local login(not facebook,google))
    //======================================================

    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',		// redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true			// allow flash messages
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

    app.get('/single', function (req, res) {
        console.log("listing page is loading ...");
        res.sendfile('./public/views/single.html');
    });

    app.get('/new', function (req, res) {
        console.log("new post is loading ...");
        res.sendfile('./public/views/new.html');
    });


}; //end export


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the welcomw page
    res.redirect('/welcome');
}