var User = require('./models/user');

module.exports = function(app) {

    
    app.get('/api/users', function(req, res) {
        console.log("Generation users list");
            // use mongoose to get all nerds in the database
            User.find(function(err, users) {
                console.log("Generation users list");
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(users); // return all nerds in JSON format
            });
        });
    
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

};