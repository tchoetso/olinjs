var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var userSchema = mongoose.Schema({
  name: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;
