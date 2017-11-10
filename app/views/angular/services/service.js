
myApp.service("cartService",function($http){

	var main = this ;


	this.dashboardApi = function(){
		return $http.get("/user/dashboard");
	}
	
	this.loginApi = function(data){

		return $http.post("/user/login",data);
	}


	this.signupApi = function(data){      
	console.log(data.firstname);      //  FOR BOOKS

		return $http.post('/user/signup',data);
	}


})