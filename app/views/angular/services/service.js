
myApp.service("cartService",function($http){

	var main = this ;


	this.dashboardApi = function(){
		return $http.get("/user/dashboard");
	}
	
	this.loginApi = function(data){

		return $http.post("/user/login",data);
	}


	this.signupApi = function(data){      

		return $http.post('/user/signup',data);
	}


	this.postProdApi = function(data){
		
		return $http.post('/product/create',data);
	}

	this.getAllApi = function(){
		
		return $http.get('/product/all');
	}

	this.getProdApi = function(productId){
		
		return $http.get("/product/"+productId+"");
	}

	this.editProdApi = function(productId,data){
		
		return $http.put('/product/edit/'+productId+'',data);
	}
	this.deleteProdApi = function(productId){
		
		return $http.post('/product/delete/'+productId+'');
	}

	this.getCartApi = function(){
		
		console.log("get all cart ran");
		
		return $http.get('/cart/all');
	}

	this.postCartApi = function(productId,data){
		
		return $http.post('/cart/add/'+''+productId+'',null);
	}

	this.deleteCartApi = function(productId){
		
		return $http.post('/cart/delete/'+''+productId+'',null);
	}

	this.postResetApi = function(data){
		console.log(data);
		return $http.post('/mail/forgotPass',data);
	}

	this.updatePasswordApi = function(password){
		return $http.post('/password/update',password);
	}

})