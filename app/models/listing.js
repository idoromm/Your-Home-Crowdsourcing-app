// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var listingSchema = mongoose.Schema({

    local           : {
        beds        : Number,
        baths       : Number,
        buildArea   : Number,
        plotArea    : Number,
        renovated   : Boolean,
        Price       : Number
    }
});

// checking if password is valid
/*userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}; */

// create the model for users and expose it to our app
module.exports = mongoose.model('Listing', listingSchema);
