// load the things we need
var mongoose = require('mongoose');
var imageSchema = require('./image');
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
        pictures        : [imageSchema]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Listing', listingSchema);
