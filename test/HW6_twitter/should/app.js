var path = require('path');
var express = require('express');
var logger = require('morgan'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express()
var mongoose = require("mongoose")
var session = require('express-session');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
//all pages
app.get('/', index.home);
app.get('/logIn', index.logIn);
app.post('/logUser', index.logUser);
app.post('/logOut', index.logOut);
app.post('/addTwot', index.addTwot);
app.post('/delTwot', index.delTwot);

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
})
;
