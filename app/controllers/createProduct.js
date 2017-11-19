var mongoose = require('mongoose');
var express = require('express');



// express router // used to define routes 
var userModel = mongoose.model('User');

var productModel = mongoose.model('Product');
var productRouter  = express.Router();
var responseGenerator = require("./../../libs/responseGenerator");
var auth = require("./../../middlewares/authorization");


module.exports.controllerFunction = function(app) {


	// productRouter.get('/create',auth.checkLogin,function(req,res){

	// 	res.redirect('/product/create');
	// })

	productRouter.get('/all',auth.checkLogin,function(req,res){
		console.log("get all working");

		productModel.find({},function(err,product){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
			}

			// else if(product == undefined || product.productName == undefined){
			// 	var myResponse = responseGenerator.generate(true,"No products found!",500,null);
   //               res.send(myResponse);
			// }
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

	             		owner				: user._id,
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
			             			//POPULATING FIRSTNAME OF USER  INSIDE OWNER FIELD
	            				productModel.findOne({"owner":user._id},{"owner":1,"_id":0}).populate('owner', 'firstName').exec(function(err,popProduct){
	            					if(err){
	             						var myResponse = responseGenerator.generate(true,err,500,null);
				                   		res.send(myResponse);
	            					}
	            					else{
	            						console.log("Save work");
	            						newProduct.owner = popProduct.owner;
			             				console.log(newProduct);
			             				var myResponse = responseGenerator.generate(false,"Product created successfull",200,newProduct);
				                   		res.send(myResponse);
				             		}
				             	});
	            			
	            			}	            			
	            			
	            		});	       	
						
				}

		        else{
		             var myResponse = responseGenerator.generate(true,"Parameter missing",500,null);
		              res.send(myResponse);
		        }
		    }
		});


    });//end post create

   productRouter.get('/:id',auth.checkLogin,function(req,res){
		console.log("get all working");

		productModel.findOne({"_id":req.params.id},function(err,product){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
			}

			// else if(product == undefined || product.productName == undefined){
			// 	var myResponse = responseGenerator.generate(true,"No products found!",500,null);
   //               res.send(myResponse);
			// }
			else{

				console.log(product);

				var myResponse = responseGenerator.generate(false,"Product found successfully",200,product);
				res.send(myResponse);
  			}
  		});

	});

   productRouter.post('/delete/:id',auth.checkLogin,function(req,res){
		console.log("get all working");

		productModel.remove({"_id":req.params.id},function(err,product){
			if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
			}

			else{

				console.log(product);

				var myResponse = responseGenerator.generate(false,"Product Deleted successfully",200,product);
				res.send(myResponse);
  			}
  		});

	});

	productRouter.put('/edit/:id',auth.checkLogin,function(req,res){
			console.log("get all working");

			var update = req.body ;
			console.log("Put working" + update);

			productModel.findOneAndUpdate({"_id":req.params.id},update,{new: true},function(err,product){
				if(err){
					var myResponse = responseGenerator.generate(true,err,500,null);
	                    res.send(myResponse);
				}

				// else if(product == undefined || product.productName == undefined){
				// 	var myResponse = responseGenerator.generate(true,"No products found!",500,null);
	   //               res.send(myResponse);
				// }
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
