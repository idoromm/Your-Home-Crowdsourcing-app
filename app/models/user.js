// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
		password     : String,
		name		 : String
    },
    facebook         : {
        id           : String,
        token        : String,
		firstName    : String,
		familyName	 : String
    },
    google           : {
        id           : String,
        token        : String,
		firstName    : String,
		familyName	 : String
	},
	reputation		 : {
		type: Number,
		default: 0
	},
    /* every entry in the array is an apartment ID and the questionsIDs (array) of the questions that the user ALREADY answered in that *specific* apartment */
    ApartmentsAndQuestions: [{
        apartmentID : String,
        questionsIDs:[String]
    }]
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
