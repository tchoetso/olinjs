var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
	_user: String,
	content: String
});

var userSchema = mongoose.Schema({
	name: String,
	twotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Twote'}]
});

var User = mongoose.model('User', userSchema);
var Twote = mongoose.model('Twote', twoteSchema);

module.exports.User = User;
module.exports.Twote = Twote;