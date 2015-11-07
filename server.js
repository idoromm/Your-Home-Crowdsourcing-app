var express = require("express");
var path    = require("path");
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var app     = express();

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Login to db ... ")
});

var port = process.env.PORT || 3000; 

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 
// set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, 'public')));



require('./app/routes')(app);






app.listen(port);

console.log("Running at Port " + port);
// expose app           
exports = module.exports = app; 

