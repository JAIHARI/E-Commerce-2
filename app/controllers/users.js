var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userModel = mongoose.model('User');
var productModel = mongoose.model('Product');
var userRouter  = express.Router();
var responseGenerator = require("./../../libs/responseGenerator");

var crypto = require("./../../libs/crypto");
var key = "Crypto-Key" ;
var auth = require("./../../middlewares/authorization");


module.exports.controllerFunction = function(app) {


    userRouter.get('/logout',function(req,res){
      
      req.session.destroy(function(err){
        
        res.redirect('/');

      });


    });//end logout

     userRouter.get('/dashboard',auth.checkLogin,function(req,res){

        // GET RECENTLY ADDED PRODUCT USING SORT AND LIMT

        req.session.user.productStatus = true ;

        //POPULATING OWNER'S FIELD WITH FIRSTNAME
        
        productModel.findOne({}).sort({'createdAt':-1}).limit(1).populate({path:'owner',select:'firstName -_id'}).exec(function(err,product){
        if(err){
            var myResponse = responseGenerator.generate(true,err,500,null);
                res.send(myResponse);
            }
            else{
                req.session.user.product = product ; 
                console.log("Dashboard"+product);
                var myResponse = responseGenerator.generate(false,"Retrieved successfully",200,req.session.user);
                res.send(myResponse);
            }
        })


    });//end get dashboard

      

    userRouter.post('/signup',function(req,res){

        var signupInfo = {};

     if(req.body.firstname!=undefined && req.body.lastname!=undefined && req.body.password!=undefined && req.body.email!=undefined){     

        userModel.findOne({"email":req.body.email},function(err,user){
           
            if(err){
                    var myResponse = responseGenerator.generate(true,err,500,null);
                    res.send(myResponse);
            }
            else if(user && user!==null){
                console.log("user is " + user)
                console.log("Email taken boss");
                signupInfo.emailPresent = true;
                 var myResponse = responseGenerator.generate(false,"Email already taken",200,signupInfo);
                 res.send(myResponse);
           }

           else{
                 console.log("Email taken working");
                 var newUser = new userModel({

                    username    : req.body.firstname+' '+req.body.lastname,
                    firstName   : req.body.firstname,
                    lastName    : req.body.lastname,
                    email       : req.body.email 
                }); 

                newUser.password = crypto.encrypt(key,req.body.password);

                newUser.save(function(err,result){
                  
                  if(err){
                        var myResponse = responseGenerator.generate(true,"Check paramaters",500,null);
                        res.send(myResponse);
                    }

                    else{

                    req.session.user = newUser;
                    delete req.session.user.password ;
                        
                    var myResponse = responseGenerator.generate(false,"Signed up successfully",200,newUser);
                     res.send(myResponse);

                    }

                });
            }
        })//usermodel ends

    }
    else{
        var myResponse = responseGenerator.generate(true,"Parameter missing",500,null);
        res.send(myResponse);
    }


    });//end post signup

    userRouter.post('/login',function(req,res){
       

        if(req.body.email != undefined && req.body.password != undefined){

            var newUser = new userModel({

                password    :  req.body.password
            });

            var verifyPassword = crypto.encrypt(key,req.body.password);

             userModel.findOne({"email":req.body.email,"password":verifyPassword},function(err,foundUser){
                    if(err){
                           console.log("Check-Clear");

                        res.send(err);
                    }
                    else if(foundUser == null){ 
                            console.log("error working");
                            var myResponse = responseGenerator.generate(true,"User data not available",500,null);
                            res.send(myResponse);
                    
                    }

                    else{          
                         req.session.user = foundUser;
                         foundUser.loginStatus = true ;
                         delete req.session.user.password ;

                          var myResponse = responseGenerator.generate(false,"Success",200,foundUser);
                          res.send(myResponse);
                         
                    }
            });
              
        }  

        else{
            var myResponse = responseGenerator.generate(true,"Some paramater is missing",500,null);
            res.send(myResponse);
        }

    });//end post login

    userRouter.get('/all',function(req,res){

        res.send("this is a route to get information on a particular user");



    });//end get all users


    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 

   

    app.use('/user', userRouter);



 
} //end contoller code
