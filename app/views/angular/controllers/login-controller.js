

myApp.controller("LoginController",["$http",'$location','cartService','$rootScope',function($http,$location,cartService,$rootScope){
	
	var main = this ; 

	this.email ;
	this.emailForReset;
	this.password;

	// HIDING NAVBAR-links FOR LOGIN-PAGE
	$rootScope.showHome =false; 
	$rootScope.showCart =false; 
	$rootScope.showLogout =false;  

	this.submitLogin = function(){

		var loginData = {

			email: main.email,
			password:main.password
		}

		cartService.loginApi(loginData)
		.then(function successCallback(response){
			console.log(response);

			if(response.data.status == 200){

				$location.path('/user/dashboard');

			}

			else{

				alert(response.data.message);
			}


			}, function  errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})
	}

	
}])