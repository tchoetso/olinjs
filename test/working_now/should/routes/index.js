var routes = {};

var mongoose = require('mongoose');
var Twot = require('../models/twotModel.js')
var User = require('../models/userModel.js')

routes.home = function(req, res){
	// 	Twot.remove({}, function(err) { 
 //   		console.log('collection removed') 
	// });
	// User.remove({}, function(err) { 
 //   		console.log('collection removed') 
	// });
	Twot.find({}).sort({"_id": -1}).exec(function(err, alltwot) {
		User.find({}).exec(function(err, allusers) {
			var qu = User.where({logged: true});
			qu.findOne(function (err, mU) {
				if (err) return handleError(err);
				if (!mU) {
					res.redirect('login');
				} else {
					for (i in alltwot) {
						if (alltwot[i].author == mU.username) {
							console.log('match');
							alltwot[i]['mine']=true;
						} else {
							console.log('anti');
							alltwot[i]['mine']=false;
						}
					}
					res.render('home',{mainUser:mU,twot:alltwot,logVal:'Log Out',user:allusers});
				}
			});
		});
	});
}

routes.logIn = function (req, res) {
	res.render('login');
};

routes.logOut = function(req, res){
	req.session.userId = '';
	res.redirect('/');
};

// routes.logOut = function(req, res){
// 	User.findOneAndUpdate({logged: true},{logged: false}, function (err, user) {
// 		if (err) return handleError(err);
// 		if (user) {
// 			console.log(user.username + ' logged out');
// 		}
// 	});
	
// }

routes.addTwot = function(req, res){
	var data = req.body.message;  // changes with model
	var tweeter = req.session.user;
	var newtweet = new tweet({
		message: data,
		author: tweeter
	});	
    	tweet.save (function (err) {
    		if (err) {
					console.log('problem saving twot', err);
				}
	});
  }



// routes.addTwot = function(req, res){
// 	var data = req.body.message;  // changes with model
// 	var query = User.where({logged: true});
// 	query.findOne(function (err, us) {
// 		if (err) return handleError(err);
// 		if (us) {
// 			twit = new Twot({
// 				message: data,
// 				author: us.username
// 			});
// 			twit.save(function (err) {
// 				if (err) {
// 					console.log('problem saving twot', err);
// 				}
// 			});
// 		}
// 	});
	
// 	res.end();
// }

routes.delTwot = function(req, res){
	var userid = req.body.id;
	console.log(data);
	Twot.find({"_id":userid}, function(err, tweets){
		var tweet = tweets[0];
		tweet.remove();
	});
	res.end();
}

// routes.delTwot = function(req, res){
// 	var data = req.body;
// 	console.log(data);
// 	Twot.findByIdAndRemove(data.id, function(err, tw){
// 		if (err) return handleError(err);
// 	});
// 	res.end();
// }


// routes.logUser = function(req, res){
// 	var nameuser = req.body.username;
// 	var myUser = new User({username: nameuser});
// 	User.find({username: nameuser})
// 		.exec(function (err, user) {
// 			if (user.length === 0) {
// 				myUser.save(function(err) {
// 					if (err) {
// 						res.status(500).send(err);
// 					} else {
// 						//req.session.userId = myUser._id
// 						req.session.user = username;
// 						res.redirect('/');
// 					}
// 				})
// 			} else {
// 				console.log("exists");
// 				//req.session.userId = myUser._id;
// 				req.session.user = username;
// 				res.redirect('/');
// 			}
// 		});
// };



routes.logUser = function(req, res){
	var data = req.body;
	User.findOneAndUpdate({username: data.username},{logged: true}, function (err, user) {
		if (err) return handleError(err);
		if (user) {
			console.log(user.username + ' logged in');
		} else {
			us = new User({
				username: data.username,
				logged: true
				});
			us.save(function (err) {
				if (err) {
					console.log('problem saving new user', err);
				}
			});
		}
	});
}


module.exports = routes;

