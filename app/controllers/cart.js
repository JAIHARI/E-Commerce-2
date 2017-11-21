var mongoose = require('mongoose');
var express = require('express');



// express router // used to define routes 
var userModel = mongoose.model('User');
var productModel = mongoose.model('Product');
var cartRouter  = express.Router();
var responseGenerator = require("./../../libs/responseGenerator");

var crypto = require("./../../libs/crypto");
var key = "Crypto-Key" ;
var auth = require("./../../middlewares/authorization");
var async = require("async");



module.exports.controllerFunction = function(app){

	// API TO GET ALL CART PRODUCTS
	cartRouter.get('/all',auth.checkLogin,function(req,res){

		//FIND USER BY ID AND GET ONLY CART FIELD AS RETURN
		userModel.find({"_id":req.session.user._id},{cart:1},function(err,items){
			console.log(items[0].cart);
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                res.send(myResponse);
			}

			else if(items[0].cart.length === 0 || items[0].cart == null){
				var inCart = false;
				var myResponse = responseGenerator.generate(false,"No products added to cart",200,inCart);
                res.send(myResponse);
			}

			else{
				var myResponse = responseGenerator.generate(false,"Success",200,items);
                res.send(myResponse);
			}

		})
	});

	
	cartRouter.post('/add/:id',auth.checkLogin,function(req,res){

		// 	CHECKING IF PRODUCT IS ALREADY PRESENT IN CART!

		var ifProductExists = req.session.user.cart.some(function(el){
			return el.productId == req.params.id
		});
			
			if(ifProductExists){
					var myResponse = responseGenerator.generate(false,"Product already exists",200,null);
	               		console.log("I already exists");
				}
				
			else{				

				var getProduct = function(callback){

					productModel.find({"_id":req.params.id},function(err,item){
						if(err){
							var myResponse = responseGenerator.generate(true,err,500,null);
			                callback(myResponse);	
						}
						else{
							callback(null,item[0]);
						}
					})
				};


				var addToCart = function(arg1,callback){
					console.log("I am item" +arg1);
					// console.log(Array.isArray(arg1));

					 var cartItem = {

					 	productId : req.params.id,
						productName: arg1.productName,
						category  :  arg1.category,
						price     : arg1.price,
						amount	: 	1
					 };


					userModel.findOneAndUpdate({"_id":req.session.user._id},{$push:{cart:cartItem}},{new:true},function(err,user){
						if(err){
							var myResponse = responseGenerator.generate(true,err,500,null);
		                	callback(myResponse);
						}
						else{

							// console.log("updated user" + user);
							callback(null,user);
						}
					})
				};


				async.waterfall([
					getProduct,
					addToCart],function(err,result){
						console.log("Last callback");
						if(err){
							var myResponse = responseGenerator.generate(true,err,500,null);
			                res.send(myResponse);
		            	}
		           		 
		           		else{
						console.log("waterfall"+result);

							var addedToCart = true;
							var myResponse = responseGenerator.generate(false,"Added to cart !!!",200,addedToCart);
				                res.send(myResponse);
		            	}
					})
			}

	});

	cartRouter.post('/delete/:id',auth.checkLogin,function(req,res){

		

					userModel.findOneAndUpdate({"_id":req.session.user._id},{$pull:{cart:{"productId":req.params.id}}},{new:true},function(err,user){
						if(err){
							var myResponse = responseGenerator.generate(true,err,500,null);
		                	res.send(myResponse);
						}
						else{
							console.log(user);
							var myResponse = responseGenerator.generate(false,"Deleted successfully",200,null);
							// console.log("updated user" + user);
							res.send(myResponse);
						}
					})
			
			
	});

	 app.use('/cart', cartRouter);
}