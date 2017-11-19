

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
