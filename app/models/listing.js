// load the things we need
var mongoose = require('mongoose');
var User = require('./user');
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
        crowd_renovated : Boolean,
        crowd_windows   : Boolean,
        crowd_light     : Boolean,
        crowd_furnished : Boolean,
        elevator        : Boolean,
        airConditioning : Boolean,
        balcony         : Boolean,
        price           : Number,
        description     : String,
        flagCount       : Number,
        /* every entry is the ID of a User that reported the listing */
        reportedUsersIDs: [String],
        owner           : User.schema,
        /* every entry in the array is a userID and the questionsIDs (array) of the questions that the user ALREADY answered in that *specific* apartment */
        UsersAndQuestions: [{
            userID: { type: String, unique: true},
            questionID: [String],
            _id : false
        }],
        /* every image has a count of how many times the users answered YES or NO on it */
        imagesAndCount: [{
            imageID: String,
            count: Number,
            _id : false
        }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Listing', listingSchema);
