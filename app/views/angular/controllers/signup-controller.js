myApp.controller("SignupController",["$http",'$location','cartService',function($http,$location,cartService){
	
	var main = this ; 

	this.firstname
	this.mobnumber;
	this.lastname;
	this.email ;
	this.password;

	this.submitSignup = function(){
		console.log("Submit signup");

		var signupData = {

			firstname : main.firstname,
			lastname: main.lastname,
			email: main.email,
			password: main.password,
			mobnumber: main.mobile
		};

		cartService.signupApi(signupData)
		.then(function successCallback(response){

			console.log(response);

				console.log(response.data);

				$location.path('/user/dashboard'); 

			}, function errorCallback(reason){
				console.log(reason);
				console.log("Error in Post");
			})
	}
}])