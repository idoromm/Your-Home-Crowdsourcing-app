/**
 * Created by Ido on 06/12/2015.
 */

// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    image: Buffer
 //   order: Number
});

module.exports = mongoose.model('Image', imageSchema);
