

var mongoose = require('mongoose');
var productModel = mongoose.model('Product');
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

module.exports.isProductAvailable = function(req,res,next){

	var productStatus ;

	productModel.find({},function(err,product){
		
		if(err){
				var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
			}

			else if(product.length == 0 || product == null){
				req.session.user.productStatus = false;
				var myResponse = responseGenerator.generate(false,"No products found!",200,req.session.user);
                 res.send(myResponse);
			}

			else{

				next();
  			}
  	});
};

// module.exports.isUserOwner = function(req,res,next){

// 	productModel.findOne({"owner":req.session.user._id},{"owner":1,"_id":0}).populate('owner', 'firstName').exec(function(err,popProduct){
// 	       if(err){
// 	            var myResponse = responseGenerator.generate(true,err,500,null);
// 				         res.send(myResponse);
// 	         }
// 	         else{
	         		
// 	            	if(popProduct.owner.firstName !== req.session.user.firstName){
// 			             				// console.log(newProduct);
// 			        	var myResponse = responseGenerator.generate(true,"Action restricted",200,null);
// 				       res.send(myResponse);
// 				    }
// 				    else{

// 				    	next();
// 				    }

// 			}
// 	});

// 			// else{

// 			// 	next();
//   	// 		}
//   	// });
// };
