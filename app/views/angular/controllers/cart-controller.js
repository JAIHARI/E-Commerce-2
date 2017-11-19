

myApp.controller("cartController",["$http",'$location','cartService','$rootScope',function($http,$location,cartService,$rootScope){
	
	var main = this ; 

	this.email ;
	this.password;
	$rootScope.showNav =false;  // hiding navbar for login-page

	this.submitLogin = function(){


		cartService.loginApi()
		.then(function successCallback(response){

			console.log(response.data);


			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})
	}
}])