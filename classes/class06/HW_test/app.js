var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var app = express();
var routes = require('./routes/index');

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.get('/', routes.main);

app.post('/login', routes.login);

app.post('/logout', routes.logout);

app.post('/createTwote', routes.createTwote);

app.post('/createUser', routes.createUser);

app.post('/deleteTwote', routes.deleteTwote);

app.listen(PORT);