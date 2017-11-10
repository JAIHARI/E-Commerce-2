

myApp.controller("DashController",["$http",'$location','cartService',function($http,$location,cartService){
	
	var main = this ; 

	this.email ;
	this.password;

	// this.submitLogin = function(){

	// 	var loginData = {

	// 		email: main.email,
	// 		password:main.password
	// 	}

		cartService.dashboardApi()
		.then(function successCallback(response){

				console.log(response);
				$location.path('/user/dashboard');

			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Post");
			})
	}
])