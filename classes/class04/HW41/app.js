var path = require('path');
var express = require('express');
var logger = require('morgan'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express()
var mongoose = require("mongoose")

var ingredients = require('./routes/ingredients')
var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";


app.engine('handlebars', exphbs({defaultLayout: 'main'},'empty'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', ingredients.home);
app.get('/ingredients', ingredients.connect);
app.get('/ingredients/list',ingredients.Ingredient);
app.post('/ingredients/add',ingredients.addingredient);
mongoose.createConnection(mongoURI);
app.listen(PORT, function() {
    console.log("Application running on port:", PORT);
});