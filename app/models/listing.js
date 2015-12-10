// load the things we need
var mongoose = require('mongoose');
var imageSchema = require('./image');
var userSchema = require('./user');
var Schema = mongoose.Schema;

// define the schema for our user model
var listingSchema = new Schema({
        street          : String,
        buildingNumber  : Number,
        apartmentNumber : Number,
        type            : String,
        floor           : Number,
        outOfFloors     : Number,
        numberOfRooms   : Number,
        size            : Number,
        renovated       : Boolean,
        elevator        : Boolean,
        airConditioning : Boolean,
        balcony         : Boolean,
        price           : Number,
        description     : String,
        flagCount       : Number,
        owner           :{
                type: Schema.ObjectId,
                ref: 'User'
        },
        pictures        : [imageSchema]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Listing', listingSchema);
