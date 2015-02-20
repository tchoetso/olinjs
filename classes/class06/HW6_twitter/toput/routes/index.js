var models = require('../models/twoteModels');
var User = models.User;
var Twote = models.Twote;

var main = function (req, res) {
	console.log("main", req.session);
	Twote.find({})
		.populate("_user")
		.sort({"_id":-1})
		.exec(function (err, twotes) {
			if (err) {
				console.log(err)
				res.status(500).send('Sorry! An error has occured.');
			} else {
				User.find({})
					.populate("twotes")
					.sort({"_id": -1})
					.exec(function (err, users) {
						console.log(users);
						if (err) {
							res.status(500).send('Sorry! An error has occured.')
						} else {
							if (req.session.userId) {
								User.find({'_id': req.session.userId})
									.exec(function (err, user) {
										if (err) {
											console.log(err);
											res.status(500).send('Sorry! An error has occured.');
										} else {
											console.log(user);
											res.render('home', {"myUser": user[0], "users": users, "twotes": twotes});
										}
									})
							} else {
							    res.render('home', {"myUser": [], "users": users, "twotes": twotes});
							}
						}
					});				
			}
		});
};

var createUser = function (req, res) {
	console.log("createUser", req.session);
	var myUser = new User({name: req.body.username, twotes: []});
	User.find({name: req.body.username})
		.exec(function (err, user) {
			if (user.length === 0) {
				console.log("new");
				myUser.save(function(err) {
					if (err) {
						res.status(500).send(err);
					} else {
						req.session.userId = myUser._id
						res.redirect('/');
					}
				})
			} else {
				console.log("exists");
				req.session.userId = user[0]['_id'];
				res.redirect('/');
			}
		});
};

var login = function (req, res) {
	console.log("login", req.session);
	res.render('login');
};

var logout = function (req, res) {
	req.session.userId = null;
	res.redirect('/');
};

var createTwote = function(req, res) {
	console.log("createTwote", req.session);
	var myId = req.body.myId.substring(3);
	var twoteText = JSON.parse(req.body.data)[0].value;
	var myTwote = new Twote({_user: myId, content: twoteText});
	myTwote.save(function(err) {
		if (err) {
			res.status(500).send(err);
		} else {
			User.findByIdAndUpdate(myId, {$push: {twotes: myTwote["_id"]}}, function(err, user) {
				if (err) {
					console.log(err);
				}
			});
			Twote.populate(myTwote, "_user", function(err, result) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.send(result);
				}
			});
		}
	});
};

var deleteTwote = function(req, res) {
	var myId = req.body.myId.substring(6);
	Twote.remove({"_id": myId}, function(err, removed) {
		if (err) {
				res.status(500).send(err);
			} else {
				res.send();
			}
		});
}

module.exports.login = login; 
module.exports.logout = logout;
module.exports.createUser = createUser;
module.exports.createTwote = createTwote;
module.exports.main = main;
module.exports.deleteTwote = deleteTwote;