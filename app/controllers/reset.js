var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userModel = mongoose.model('User');
var mailRouter  = express.Router();
var responseGenerator = require("./../../libs/responseGenerator");

var crypto = require("./../../libs/crypto");
var key = "Crypto-Key";
var auth = require("./../../middlewares/authorization");


module.exports.controllerFunction = function(app) {
	console.log("Reset works");

	mailRouter.post('/forgotPass',function(req,res){

		userModel.find({"email":req.body.email},function(err,user){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                res.send(myResponse);
			}
			else{
				console.log(user);
				res.send(user);
			}
		})
	})

app.use('/mail',mailRouter)

}