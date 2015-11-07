var User = require('./models/user');

module.exports = function(app) {


    app.get('/api/users', function(req, res) {
            // use mongoose to get all users in the database
            User.find(function(err, users) {
                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
				console.log(users);
                res.json(users); // return all nerds in JSON format
            });
        });

	app.post('/api/users', function(req, res) {

        var name = req.body.name;
		var user=new User({"name":name});
		user.save(function(err) {
			if (err) throw err;

			console.log(user+ ' has been saved successfully!');
        res.json(user);
        });
    });


	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

	app.get('/', function(req, res) {
	    console.log("Main Page is loading ...");
		res.sendfile('./public/views/index.html');
	});
    app.get('/user', function(req, res) {
        console.log("User Page as been loading ...");
        res.sendfile('./public/views/user.html');
    });
	app.get('/single', function(req, res) {
    	    console.log("listing page is loading ...");
    		res.sendfile('./public/views/single.html');
    	});
};