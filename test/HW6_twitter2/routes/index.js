var path = require('path');
var Models = require(path.join(__dirname,'../models/twoterModels'));
var User = Models.User;
var Twote = Models.Twote;

var home = function (req, res) {

	Twote.find({}).populate("_user").sort({"_id":-1}).exec(function (err, twotes) {
			User.find({}).populate("twotes").sort({"_id": -1}).exec(function (err, users) {
					if (err) {
						console.error("error!");
					} else {
						User.find({'_id': req.session.userId}, function (err, user) {
							if (err) {
								console.error("error!");
							} else {
								res.render('home', {'twotes': twotes,'currentuser': user[0],'users': users});
							};
						}); 
					}
				});			
	});
};


var newTwote = function(req, res) {
	twoteText = JSON.parse(req.body.data)[0].value;
	var newTwote = new Twote({_user: req.session.userId, content: twoteText});
	newTwote.save(function(err) {
		if (err) {
			console.error("error");
		} else {
			Twote.populate(newTwote, "_user", function(err, twotes) {
				if (err) {
					console.error("error");
				} else {
					res.send(twotes);
				}
			});
		}
	});
};


var newUser = function (req, res) {
	var username = req.body.username;
	var newuser = new User({name: username, twotes: []});
	User.find({name: username})
		.exec(function (err, user) {
			if (user.length === 0) {
				newuser.save(function(err) {
					if (err) {
						console.error("error");
					} else {
						req.session.userId = newuser._id
						res.redirect('/');
					}
				})
			}
		});
};




var login = function (req, res) {
	res.render('login');
};


var logout = function(req, res) {
	if (req.session.userId) {
		req.session.destroy();
		res.redirect('/');
	} else {
		console.error("not logged in");
	}
}


var deleteTwote = function(req, res) {
  var twoteId = req.body.id;
	Twote.findOneAndRemove({'_id': twoteId}, function(err, data) {
		if (err) console.log('error removing twote')
		res.end()
	});
}


module.exports.home = home;
module.exports.login = login; 
module.exports.logout = logout;
module.exports.newUser = newUser;
module.exports.newTwote = newTwote;
module.exports.deleteTwote = deleteTwote;