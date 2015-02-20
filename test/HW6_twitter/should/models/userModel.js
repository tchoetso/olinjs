var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	logged: Boolean
});

module.exports = mongoose.model("User", userSchema);