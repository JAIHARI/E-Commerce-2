myApp.controller("SignupController",["$http",'$location','cartService',function($http,$location,cartService){
	
	var main = this ; 

	this.firstname
	
	this.lastname;
	this.email ;
	this.password;

	this.submitSignup = function(){
		// console.log("Submit signup");

		var signupData = {

			firstname : main.firstname,
			lastname: main.lastname,
			email: main.email,
			password: main.password
		};

		cartService.signupApi(signupData)
		.then(function successCallback(response){

			// console.log(response);

			if(response.data.status == 200 && response.data.data.emailPresent !== true){
				$location.path('/user/dashboard'); 
			}
			else{
				alert(response.data.message);
			}

			

		}, function errorCallback(reason){
				console.log(reason);
				console.log("Error in Post");
			})
	}
}])