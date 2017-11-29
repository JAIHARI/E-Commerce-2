

myApp.controller("ForgotController",["$http",'$location','cartService','$rootScope',function($http,$location,cartService,$rootScope){
	
	var main = this ;

	this.alerts = false;
	this.alertText = false; 

	this.email ;
	this.emailForReset;
	this.newPassword;

	$rootScope.showNav =false;  // hiding navbar for login-page

	
	 //FOR RESET PASSWORD
	 
	this.resetPass = function(email){

		var emailToSent = {
			email : main.emailForReset
		};
		console.log("email "+emailToSent);

		cartService.postResetApi(emailToSent)
		.then(function successCallback(response){
			console.log(response);

			if(response.data.status ==200){

				function emailAlert(){

	      			main.alerts = true;
	      			main.alertText = response.data.message;
	      			$timeout(function() {
	         			main.alerts = false;
	      			}, 1500);

   				};

   				emailAlert();
			}

		}, function errorCallback(reason){
			console.log(reason);
			alert("Error in Login-Post");
		})
	};

	this.updatePassword = function(){

		var passwordSent =  main.newPassword ;

		cartService.updatePasswordApi(passwordSent)
		.then(function successCallback(response){
			console.log(response);

		}, function errorCallback(reason){
			console.log(reason);
			alert("Error in Login-Post");
		})
	};
}])