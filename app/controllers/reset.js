
var mongoose = require('mongoose');
var express = require('express');

var app  = express.Router();
var userModel = mongoose.model('User');

// NODEMAILER FOR SENDING MAIL
var nodemailer = require('nodemailer');

var responseGenerator = require("./../../libs/responseGenerator");
var crypto = require("./../../libs/crypto");
var key = "Crypto-Key";
var auth = require("./../../middlewares/authorization");



module.exports.controllerFunction = function(app) {

	// CONFIGURING SMTP SERVER

	var smtp = nodemailer.createTransport({
		service : "gmail",
		port : 465,
		auth:{
			user:'rahul.mit.201209@gmail.com',
			pass:'newAccount'
		},
		tls: {rejectUnauthorized: false},
    	debug:true

	});

	var email = '';

	// ---------API TO HANDLE FORGOT PASSWORD ----------

	app.post('/forgotPass',function(req,res){

		email = req.body.email ;

		userModel.find({"email":email},{"password":0},function(err,user){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                res.send(myResponse);
			}
			else if(user == null || user==undefined || user==''){
				var myResponse = responseGenerator.generate(false,"No user found",200,false);
                res.send(myResponse);
			}
			else{

				//CONTENTS OF THE MAIL TO BE SENT
				var mailOptions = {
					from : "rahul.mit.201209@gmail.com",
            		to: user[0].email, // list of receivers
            		subject:'Password recovery - shopCart', // Subject line
            		text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Follow this link to update your password : http://localhost:3000/#/password/update\n\n' +
          			'If you did not request this, please ignore this email and your password will remain unchanged.\n'// plaintext bod
				};
				
				smtp.sendMail(mailOptions,function(err,response){
			        if(err){	        	
			        	var myResponse = responseGenerator.generate(true,err,500,null);
                		res.send(myResponse);
			        }
			        else{  	
			        	req.session.sentMail = true;
			        	var myResponse = responseGenerator.generate(false,
			        		"An Email for password recovery has been sent to "+user[0].email+"",
			        		200,req.session.sentMail);
                		res.send(myResponse);
			        }
					
			     })
				
			}
		})

	})


	// ---------API TO UPDATE PASSWORD------------

	app.post('/password/update',auth.isMailSent,function(req,res){

		var newPasswordUpdate = crypto.encrypt(key,req.body.password);
		console.log("password" +newPasswordUpdate);	
		
		userModel.findOneAndUpdate({"email":email},{password:newPasswordUpdate},function(err,user){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                res.send(myResponse);
			}
			else{
				console.log(user);
				var myResponse = responseGenerator.generate(false,"Successfully updated password",200,null);
                res.send(myResponse);
			}
		})
	}) 
}