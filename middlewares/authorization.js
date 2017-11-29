

var mongoose = require('mongoose');
var productModel = mongoose.model('Product');
var userModel = mongoose.model('User');

var responseGenerator = require("./../libs/responseGenerator");

module.exports.checkLogin = function(req,res,next){

	if(!req.session.user){
		
		res.status(200).send({"userLog":false,"message":"Please Log in"});
	}

	else{
		console.log("ELSE worked");

		next();
	}
};
