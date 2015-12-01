// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var listingSchema = new Schema({
        street          : String,
        buildingNumber  : Number,
        apartmentNumber : Number,
        beds            : Number,
        baths           : Number,
        buildArea       : Number,
        plotArea        : Number,
        renovated       : Boolean,
        price           : Number,
        description     : String,
});

// checking if password is valid
/*userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}; */

// create the model for users and expose it to our app
module.exports = mongoose.model('Listing', listingSchema);
