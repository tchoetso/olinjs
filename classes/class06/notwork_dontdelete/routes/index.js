var models = require('../models/twoteModels');
var User = models.User;
var Twote = models.Twote;


// var main = function (req, res) {
// 	console.log("main", req.session);
// 	Twote.find({})
// 		.populate("_user")
// 		.sort({"_id":-1})
// 		.exec(function (err, twotes) {
// 			if (err) {
// 				console.log(err)
// 				res.status(500).send('Sorry! An error has occured.');
// 			} else {
// 				User.find({})
// 					.populate("twotes")
// 					.sort({"_id": -1})
// 					.exec(function (err, users) {
// 						console.log(users);
// 						if (err) {
// 							res.status(500).send('Sorry! An error has occured.')
// 						} else {
// 							if (req.session.userId) {
// 								User.find({'_id': req.session.userId})
// 									.exec(function (err, user) {
// 										if (err) {
// 											console.log(err);
// 											res.status(500).send('Sorry! An error has occured.');
// 										} else {
// 											console.log(user);
// 											res.render('home', {"myUser": user[0], "users": users, "twotes": twotes});
// 										}
// 									})
// 							} else {
// 							    res.render('home', {"myUser": [], "users": users, "twotes": twotes});
// 							}
// 						}
// 					});				
// 			}
// 		});
// };

var main = function (req, res) {
	console.log("main", req.session);
	var currentuser;
	if (req.session.userId) {
		currentuser = req.session.userId;
	} else {
		currentuser = false;
	};
    Twote.find({})
		.populate("_user") // from models
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
						if (err) {
							console.log(err);
							res.status(500).send('Sorry! An error has occured.');
						} else {
							res.render('home', {"myUser": currentuser, "users": users, "twotes": twotes});
						}					
				});				
			}
		});
};

module.exports.main = main;

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

//module.exports.login = login; 
//module.exports.logout = logout;
//module.exports.createUser = createUser;
module.exports.createTwote = createTwote;
module.exports.deleteTwote = deleteTwote;