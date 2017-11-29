var mongoose = require('mongoose');
var express = require('express');



// express router // used to define routes 
var userModel = mongoose.model('User');

var productModel = mongoose.model('Product');
var productRouter  = express.Router();
var responseGenerator = require("./../../libs/responseGenerator");
var auth = require("./../../middlewares/authorization");
var async = require("async");


module.exports.controllerFunction = function(app) {

	productRouter.get('/all',auth.checkLogin,function(req,res){
		console.log("get all working");

		productModel.find({}).populate("owner", "firstName").exec(function(err,product){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
			}

			else{
				console.log(product);

				var myResponse = responseGenerator.generate(false,"Product got successfully",200,product);
				res.send(myResponse);
  			}
  		});

	});

			// API TO CREATE A PRODUCT
    productRouter.post('/create',auth.checkLogin,function(req,res){

    	userModel.findOne({"email":req.session.user.email},function(err,user){
  
    		if(err){
    			 var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
    		}
    		else{

     			if(req.body.productName!=undefined && req.body.category!=undefined && req.body.color!=undefined && req.body.addInfo!=undefined && req.body.availIn!=undefined){     

     				console.log("post-if entering");
	             	var newProduct = new productModel({

	             		owner				: user,
			            productName  		: req.body.productName,
						category			: req.body.category,
						price				: req.body.price,
						color				: req.body.color,
						additionalInfo		: req.body.addInfo,
						availableIn	  		: req.body.availIn
	            	});

		    
	            	newProduct.save(function(err,result){       		

			           	if(err){
			           		var myResponse = responseGenerator.generate(true,err,500,null);
				                res.send(myResponse);
		             	}

		             	else{
			             		
		             	//POPULATING FIRSTNAME OF USER  INSIDE OWNER FIELD AND RESULT DISPLAYS ONLY FIRSTNAME FIELD
	           			productModel.findOne({"owner":user._id},{"owner":1,"_id":0}).populate('owner', 'firstName').exec(function(err,popProduct){
	           					
	           				if(err){
            						var myResponse = responseGenerator.generate(true,err,500,null);
			                   		res.send(myResponse); 
			                 }
	            			else{
	            				console.log("Save work");
	            				newProduct.owner = popProduct.owner;
			           			// console.log(newProduct);
			           			var myResponse = responseGenerator.generate(false,"Product created successfull",200,newProduct);
				                 res.send(myResponse);
				             	}
				             }); //Findone ends
	            			
	            		}	            			
	            			
	            	});	//Save ends  	
						
				}

		        else{
		             var myResponse = responseGenerator.generate(true,"Parameter missing",500,null);
		              res.send(myResponse);
		        }
		    }
		});


    });//end post create


    //GET PARTICULAR PRODUCT

   productRouter.get('/:id',auth.checkLogin,function(req,res){
		console.log("get all working");

		// Identifying product with req.params and populating it with its owner's firstName field
		productModel.findOne({"_id":req.params.id}).populate({path:'owner',select:'firstName -_id'}).exec(function(err,product){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
			}

			else{

				console.log(product);

				var myResponse = responseGenerator.generate(false,"Product found successfully",200,product);
				res.send(myResponse);
  			}
  		});

	});

   //API TO DELTE A PARTICULAR PRODUCT
   productRouter.post('/delete/:id',auth.checkLogin,function(req,res){

   	var forInfo={};

   	//Experimental usage of Async 

   	var getProduct = function(callback){

		productModel.findOne({"_id":req.params.id}).populate({path:'owner',select:'firstName -_id'}).exec(function(err,product){

			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
	                   callback(myResponse);			
			}
			else{
				console.log("series-1");
				callback(null,product);
			}
		})
	};

	var getUser = function(arg1,callback){

		userModel.findOne({"_id":req.session.user._id},function(err,user){

			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
	                    callback(myResponse);			
			}
			else{
				console.log("series-2");
				callback(null,arg1,user);
			}
		})
	};

	var checkAuthorityAndDelete = function(arg1,arg2,callback){
		// console.log(arg1);
		// console.log(arg2);

		// IF CURRENT PRODUCT'S OWNER IS CURRENT USER THEN DELETE
		if(arg1.owner.firstName == arg2.firstName){
			console.log("Checkauthority..you are allowed to delete");
			productModel.remove({"_id":req.params.id},function(err,product){
						
				if(err){
						var myResponse = responseGenerator.generate(true,err,500,null);
	             		callback(myResponse);
				}

				else{
					forInfo.authCheck = true;
					var myResponse = responseGenerator.generate(false,"Product Deleted successfully",200,forInfo.authCheck);
					callback(null,myResponse);
	  			}
	  		});


		}
	 	else{
	 		console.log("Checkauthority..not allowed to delete");
	  			forInfo.authCheck = false;
	  			var myResponse = responseGenerator.generate(false,"Not authorized to delete this product",200,forInfo.authCheck);
				callback(null,myResponse);
	  	}
	};

	// ASYNC Waterfall TO RUN ONE DB OPERATION AFTER ANOTHER AND ALSO FOR CODE READABILITY
	async.waterfall([
		getProduct,
		getUser,
		checkAuthorityAndDelete
		],function(err,results){
			if(err){
				res.send(err)
			}
			else{

				if(forInfo.authCheck == true){
					console.log("Inside waterfall will delete from cart")
					
				// IF USER IS AUTHORIZED, DELETE FROM CART ALSO
					userModel.findOneAndUpdate({"_id":req.session.user._id},{$pull:{"cart":{"productId":req.params.id}}},function(err,result){
						if(err){
							var myResponse = responseGenerator.generate(true,"error is"+error+"",500,null);
							res.send(myResponse);
						}

						else{

						 var myResponse = responseGenerator.generate(false,"PRODUCT DELETED SUCCESSFULLY",200,forInfo.authCheck);
						 res.send(myResponse);
						}
					})

				}

				else{
					var myResponse = responseGenerator.generate(false,"Action Denied",200,forInfo.authCheck);
					res.send(myResponse);
				}

			}		
	 		}) // ASYNC series ends
		

	});

   	// API TO EDIT A PRODUCT
	productRouter.put('/edit/:id',auth.checkLogin,function(req,res){
			console.log("get all working");

			var update = req.body ;
			console.log("Put working" + update);

			productModel.findOneAndUpdate({"_id":req.params.id},update,{new: true},function(err,product){
				if(err){
					var myResponse = responseGenerator.generate(true,err,500,null);
	                    res.send(myResponse);
				}
				else{

					console.log(product);

					var myResponse = responseGenerator.generate(false,"Product Edited successfully",200,product);
					res.send(myResponse);
	  			}
	  		});

		});

    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 

    app.use('/product', productRouter);
 
} //end contoller code
