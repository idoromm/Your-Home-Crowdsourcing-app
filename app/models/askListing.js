var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var askListingSchema = new Schema({
    latitude        : Number,
    longitude       : Number,
    country         : String,
    city            : String,
    street          : String,
    buildingNumber  : Number,
    apartmentNumber : Number
});


// create the model for users and expose it to our app
module.exports = mongoose.model('AskListing', askListingSchema);