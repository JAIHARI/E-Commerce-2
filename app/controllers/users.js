var mongoose = require('mongoose');
var express = require('express');



// express router // used to define routes 
var userModel = mongoose.model('User');
var userRouter  = express.Router();
var responseGenerator = require("../libs/responseGenerator");
var auth = require("./../../middlewares/authorization");



/*
var response = {
    error: false,
    message: null,
    status: 200,
    data: null
};
*/

module.exports.controllerFunction = function(app) {


    userRouter.get("/signup",function(req,res){

       // res.redirect("/users/signup");
    
    });

    userRouter.get("/login",function(req,res){

       // res.render("login");
       console.log("notworking");
    
    });

     userRouter.get('/dashboard',auth.checkLogin,function(req,res){
        

    });//end get dashboard

      userRouter.get('/logout',function(req,res){
      
      // req.session.destroy(function(err) {
      //   console.log("destroyed successfully");

      //   res.redirect('/users/login');

      // });

    });//end logout

    userRouter.post('/signup',function(req,res){

     if(req.body.firstname!=undefined && req.body.lastname!=undefined && req.body.password!=undefined && req.body.email!=undefined){

                        console.log(req.body.firstname);

             var newUser = new userModel({

                username    : req.body.firstname+' '+req.body.lastname,
                firstName   : req.body.firstname,
                lastName    : req.body.lastname,
                email       : req.body.email,
                password    : req.body.password
            });


            newUser.save(function(err,result){

           
                if(err){
                    var myResponse = responseGenerator.generate(true,"Check email and password paramater",500,null);
                    res.send(myResponse);
                }

                else{

                    console.log(req.session);
                    req.session.user = newUser;

                     // res.redirect('/user/dashboard');
                }
            });
        }
        else{
             var myResponse = responseGenerator.generate(true,"Parameter missing",500,null);
              res.send(myResponse);
        }


    });//end post signup

    userRouter.post('/login',function(req,res){
        console.log("login ran");

        if(req.body.email != undefined && req.body.password != undefined){

            console.log("Check-Clear");

             userModel.findOne({"email":req.body.email,"password":req.body.password},function(err,result){
                    if(err){
                        console.log("ha ha ha");
                        res.send(err);
                    }
                    else if(result == null){ 
                          console.log("error working");
                         var myResponse = responseGenerator.generate(true,"No user data",500,null);
                           res.render("error",{message:myResponse.message,
                                Status_code:myResponse.status});
                    
                    }

                    else{

                          
                          req.session.user = result;
                          console.log(req.session.user);
                       res.redirect("/user/dashboard");
                    }
            });
              
        }  

        else{
            var myResponse = responseGenerator.generate(true,"Some paramater is missing",500,null);
            res.render("error",{message:myResponse.message,
                                Status_code:myResponse.status});
        }

    });//end post login

    userRouter.get('/all',function(req,res){

        res.send("this is a route to get information on a particular user");



    });//end get all users


    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 


// app.use(function(req,res,next){

//     if(req.session && req.session.user){
//         console.log("Hi, I ran");
//         userModel.findOne({'email':req.session.user.email},function(err,user){

//             if(user){
//                 console.log("user is authenticated");
//                 req.session.user = user;
//                 console.log(req.session.user);
//                 delete req.session.user.password; 
                
//                 next()
//             }
//             else{
//                 // do nothing , because this is just to set the values
//                 console.log("something fishy");
//             }
//         });
//     }
//     else{
//         console.log("App-level not worjk");
//         next();
//     }


// });
   

    app.use('/user', userRouter);



 
} //end contoller code
