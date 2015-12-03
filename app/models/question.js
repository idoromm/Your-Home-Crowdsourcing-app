/**
 * Created by Ido on 01/12/2015.
 */
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var questionSchema = new Schema({
    question: {
        type: String,
        required: true,
        ID: {
            unique: true
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    apartmentID: {
        type: String,
    }

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Question', questionSchema);

