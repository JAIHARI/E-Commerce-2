var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


app.use(logger('dev'));

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

app.use(session({
  name :'myCustomCookie',
  secret: 'mySecret', // encryption key 
  resave: true,
  httpOnly : true,  // to prevent cookie-forgery
  saveUninitialized: true,
  cookie: { secure: false }  // make true incase of SSL certificate
}));

//built-in Node-module to get path.No installation required
var path = require("path");

// accessing public directory
app.use(express.static(__dirname +'/app/views'));

//Establishing database connection

var dbPath = "mongodb://localhost/shopCart";

db = mongoose.connect(dbPath);

mongoose.connection.once('open',function(){
	console.log(dbPath);
	console.log("Success! Database connection open");
});


// fs module, by default module for file management in nodejs
var fs = require('fs');

// include all our model files
fs.readdirSync('./app/models').forEach(function(file){
	// check if the file is js or not
	if(file.indexOf('.js'))
		// if it is js then include the file from that folder into our express app using require
		require('./app/models/'+file);

});// end for each

// include controllers
fs.readdirSync('./app/controllers').forEach(function(file){
	if(file.indexOf('.js')){
		// include a file as a route variable
		var route = require('./app/controllers/'+file);
		//call controller function of each file and pass your app instance to it
		route.controllerFunction(app)

	}

});//end for each


app.get('*',function(request,response,next){
		
	response.status = 404 ;

	//similar to next(err) i.e calling error

	next("Error in path");
});


//Error handling Middleware

app.use(function(err,req,res,next){
	console.log("Custom Error handler used");
	if(res.status == 404){
		res.send("Invalid Path. Kindly make sure your URL is right");
	}
	else{
		res.send(err);
	}
});  




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// // TO ALERT INCASE OF DASHBOARD PAGE
		// var alertMessage = req.body.alertMessage;
		
		// // TO CHECK HOW MANY PRESENT IN CART
		// var noOfItems = 0;


		// userModel.find({"_id":req.session.user._id},function(err,user){
		// 		if(err){
		// 			console.log("no found user");
		// 		}
		// 		else{

		// 			console.log("I am the FIRST founduser "+user);
		// 		}

		// 		var cartItem = {
		// 				 	productId : mongoose.Types.ObjectId(req.params.id),
		// 					productName: '',
		// 					category  :  '',
		// 					price     : 0,
		// 					number	: 	1
		// 		};

		// 			// ARRAY.SOME() TO CHECK IF PRODUCT ALREADY PRESENT IN CART ARRAY
		// 			var toCheckCart = user[0].cart.some(function(elem){

	 //           			return elem.productId.toString() === req.params.id ;

	 // 	        	})
					            

		// 		// IF ITEM ALREADY EXISTS, THEN ALERT --> FOR DASHBOARD

		// 		if(toCheckCart == true && alertMessage==true){

		// 				var myResponse = responseGenerator.generate(
		// 					false,"Product already added to cart",200,true);
		// 			     res.send(myResponse);
		// 		}

		// 		else{

		// 			for(var i=0;i<user[0].cart.length;i++){
						
		// 				//IF ITEM EXISTS IN CART, INCREASE THE COUNT

  //           			if(user[0].cart[i].productId==req.params.id){
            				
  //           				user[0].cart[i].number++;

  //               			noOfItems++;
        			
  //       				}
  //       			}
					
		// 			if(noOfItems==0){
		            	
		//             	user[0].cart.push(cartItem);
		// 			 }
					
		// 			var cartSkeleton = user[0];
			    
		// 			var getProduct = function(callback){

		// 				productModel.find({"_id":req.params.id},function(err,item){
		// 					if(err){
		// 						var myResponse = responseGenerator.generate(true,err,500,null);
		// 		                callback(myResponse);	
		// 					}
		// 					else{
								 
		// 						callback(null,item[0]);
		// 					}
		// 				})
		// 			};

		// 			var addToCart = function(arg1,callback){

		// 				for(var i=0;i<cartSkeleton.cart.length;i++){
	            			
	 //            			if(cartSkeleton.cart[i].productId.toString()==req.params.id){

	 //              			  cartSkeleton.cart[i].category = arg1.category;
	 //              			  cartSkeleton.cart[i].price = arg1.price;
	 //              			  cartSkeleton.cart[i].productName = arg1.productName;
	 //            			}
  //       				}

		// 				userModel.findOneAndUpdate({"_id":req.session.user._id},
		// 					// {$push:{cart:cartItem}},
		// 					cartSkeleton,
		// 					{new:true},function(err,finalUser){

		// 					if(err){
		// 						var myResponse = responseGenerator.generate(true,err,500,null);
		// 	                	callback(myResponse);
		// 					}
		// 					else{
		// 						 console.log("updated user" + finalUser);
		// 						callback(null,finalUser);
		// 					}
		// 				})
		// 			};

		// 			async.waterfall([
		// 				getProduct,
		// 				addToCart],function(err,result){

		// 					if(err){
		// 						var myResponse = responseGenerator.generate(true,err,500,null);
		// 		                res.send(myResponse);
		// 	            	}
			           		 
		// 	           		else{
		// 					console.log("waterfall"+result);
		// 					 req.session.user.addedToCart = true;
		// 					req.session.user.cart = result.cart ;
							
		// 						var myResponse = responseGenerator.generate(
		// 							false,"Added to cart !!!",200,req.session.user);
		// 			                res.send(myResponse);
		// 	            	}
		// 			})
		// 		}

		// 	})	// DB OPERATION ENDS
		//});