// load the things we need
var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

// define the schema for our user model
var listingSchema = new Schema({
        latitude        : Number,
        longitude       : Number,
        country         : String,
        city            : String,
        street          : String,
        buildingNumber  : Number,
        apartmentNumber : Number,
        type            : String,
        floor           : Number,
        outOfFloors     : Number,
        numberOfRooms   : Number,
        size            : Number,
        renovated       : Boolean,
        crowd_renovated : Number,
        crowd_renovated_total : Number,
        crowd_windows   : Number,
        crowd_windows_total : Number,
        crowd_light     : Number,
        crowd_light_total : Number,
        crowd_furnished : Number,
        crowd_furnished_total : Number,
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
