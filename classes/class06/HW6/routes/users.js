var mongoose = require('mongoose');
var Tweet = require('../models/tweetmodel');
var User = require('../models/usersmodel');

var login = function (req, res) {
	res.render('login');
};

// ryan sloginhandler  marena also  
var makeuser = function (req, res) {
	var nameuser = req.body.username;
	var adduser = new User({username: nameuser});
	User.find({username: nameuser})
		.exec(function (err, user) {
			if (user === 0){  // makes a new user 
				adduser.save(function(err){
					if (err){
						res.status(500).send('cannot create new user');
					} else {
						req.sesion.user = adduser; 
						res.redirect("/")
					}
				})
			} else {
				// previous user logs in 
				req.session.user = nameuser;
				res.redirect("/")
			}
        })
};

var logout = function (req, res) {
	req.session.userId = '';
	res.redirect('/');
};

module.exports.login = login; 
module.exports.makeuser = makeuser; 	
module.exports.logout = logout; 









