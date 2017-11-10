
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
            

            .otherwise(
                      {
                          redirectTo:'/'
                          
                      }
                  );
          }]);