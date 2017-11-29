
 myApp.config(["$routeProvider",function($routeProvider){
            $routeProvider

            .when("/",{
               templateUrl : "templates/login.html",
               controller : "LoginController",
               controllerAs : "loginCtrl"
            })
            .when("/user/dashboard",{
              templateUrl : "templates/dashboard.html",
              controller : "DashController",
              controllerAs : "dashCtrl"
            })
      		.when("/user/signup",{
               templateUrl : "templates/signup.html",
               controller : "SignupController",
               controllerAs : "signupCtrl"
            })
            .when('/product/create',{
                  templateUrl : "templates/createProduct.html",
                  controller : "CreateProdController",
                  controllerAs : "createCtrl"
            })
            .when('/product/all',{
                  templateUrl : "templates/allProducts.html",
                  controller : "AllProdController",
                  controllerAs : "allCtrl"
            })
            .when('/product/:id',{
                  templateUrl : "templates/editDelete.html",
                  controller  : "EditDeleteController",
                  controllerAs : "edDelCtrl"
            })
            .when('/cart/all',{
                  templateUrl : "templates/something.html",
                  controller  : "cartController",
                  controllerAs : "cartCtrl"
            })
            .when('/mail/forgot',{
                  templateUrl : "templates/forgot.html",
                  controller  : "ForgotController",
                  controllerAs : "forgotCtrl"
            })
            .when('/password/update',{
                  templateUrl : "templates/updatePassword.html",
                  controller  : "ForgotController",
                  controllerAs : "forgotCtrl"
            })
            

            .otherwise(
                      {
                          redirectTo:'/'
                          
                      }
                  )
          }]);