var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	price: Number,
	instock: Boolean
});

var ingredients = mongoose.model('ingredients', userSchema);

module.exports = ingredients;
