
var models = require('../models/twoteModels');
var User = models.User;
var Twote = models.Twote;

var createUser = function (req, res) {
	var nameuser = req.body.username;
	var myUser = new User({name: nameuser});
	User.find({name: nameuser})
		.exec(function (err, user) {
			if (user.length === 0) {
				myUser.save(function(err) {
					if (err) {
						res.status(500).send(err);
					} else {
						req.session.userId = myUser._id
						//req.session.user = username;
						res.redirect('/');
					}
				})
			} else {
				console.log("exists");
				req.session.userId = myUser._id;
				//req.session.user = username;
				res.redirect('/');
			}
		});
};

var login = function (req, res) {
	res.render('login');
};


var logout = function (req, res) {
	req.session.userId = '';
	res.redirect('/');
};

// var login = function(req, res) {
//   res.render('login', {
//     currentuser: req.session.user
//   });
// };
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
module.exports.deleteTwote = deleteTwote;
module.exports.createTwote = createTwote;