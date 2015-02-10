var mongoose = require('mongoose');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);


var ingredientsSchema = mongoose.Schema({
name: String,
price: Number,
out: Boolean
});

module.exports.Ingredients = mongoose.model('Ingredients',ingredientsSchema);
