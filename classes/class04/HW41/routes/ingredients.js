var kk = require('./modin.js');
var path = require('path');
var ingredients = require(path.join(__dirname,'../model/modelingredients'));

var home = function (req, res) {
  res.render("home");
};

var connect = function (req, res) {
  res.render("ingredients");
};

var Ingredient = function(req,res){
  // shows a lits of ingredients
  ingredients.find()
    .exec(function(err,data){
    res.render('listingredients',{"listingredients": data});
  });
};

var addingredient = function(req, res) {
  // adds a new ingredient 
  // specify price and name
  var name = req.body.name; 
  var price = req.body.price 
  var instock = true;
    var ingredient = ingredients({"name": name, "price": price, "instock": instock});
    ingredient.save(function(err) {
      if (err) {
        console.log("Error adding ingredient", err)
      } else {
        console.log("Ingredient id", ingredient._id)
        res.send(ingredient._id)
      }   
    })
}

module.exports.home = home;
module.exports.connect = connect;
module.exports.Ingredient = Ingredient;
module.exports.addingredient = addingredient; 
