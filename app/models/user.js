// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
		password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
		familyName	 : String
    },
    google           : {
        id           : String,
        token        : String,
		familyName	 : String
	},
	reputation		 : {
		type: Number,
		default: 0
	},
	name			 : String,
    /* every entry in the array is an apartment ID and the questionsIDs (array) of the questions that the user ALREADY answered in that *specific* apartment */
    ApartmentsAndQuestions: [{
        apartmentID : String,
        questionsIDs: [String]
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
//module.exports = userSchema;
module.exports.schema = userSchema;