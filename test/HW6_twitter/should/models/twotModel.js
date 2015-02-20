var mongoose = require('mongoose');

var twotSchema = mongoose.Schema({
	author: String,
	message: String
});

module.exports = mongoose.model("Twot", twotSchema);