
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
            .when('/user/cart',{
                  templateUrl : "templates/cart.html",
                  controller  : "cartController",
                  controllerAs : "cartCtrl"
            })
            

            .otherwise(
                      {
                          redirectTo:'/'
                          
                      }
                  )
          }]);