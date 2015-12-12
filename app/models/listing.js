// load the things we need
var mongoose = require('mongoose');
var imageSchema = require('./image');
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
        ownerID         : String,
        /* every entry in the array is a userID and the questionsIDs (array) of the questions that the user ALREADY answered in that *specific* apartment */
        UsersAndQuestions: [{
            userID: String,
            questionID: [String]
        }],
        /* every image has a count of how many times the users answered YES or NO on it */
        imagesAndCount: [{
            imageID: String,
            count: Number
        }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Listing', listingSchema);
