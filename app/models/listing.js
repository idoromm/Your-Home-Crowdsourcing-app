// load the things we need
var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

/* define the schema for our listing model */
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
        elevator        : Boolean,
        airConditioning : Boolean,
        balcony         : Boolean,
        price           : Number,
        description     : String,
        crowd_renovated : {type: Number, default: 0},
        crowd_renovated_total : {type: Number, default: 0},
        crowd_windows   : {type: Number, default: 0},
        crowd_windows_total : {type: Number, default: 0},
        crowd_light     : {type: Number, default: 0},
        crowd_light_total : {type: Number, default: 0},
        crowd_furnished : {type: Number, default: 0},
        crowd_furnished_total : {type: Number, default: 0},
        flagCount       : {type:Number, default: 0},
        /* every entry is the ID of a User that reported the listing */
        reportedUsersIDs: [String],
        ownerID         : String,
        ownerName      : String,
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
