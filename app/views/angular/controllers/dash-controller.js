

myApp.controller("DashController",["$http",'$location','cartService','$rootScope','$timeout',
	function($http,$location,cartService,$rootScope,$timeout){
	
	var main = this ; 

	this.alerts = false;
	this.alertText ='';
	
	this.userProducts = [];
	this.productAvail;
	this.recentProduct;
	this.userName;

	$rootScope.showNav = true; //Showing navbar for Dashboard page

	this.showForm = false;

	
		cartService.dashboardApi()
		.then(function successCallback(response){
			// console.log(response);

			if(response.data.userLog == false){
				alert(response.data.message)
				$location.path('/');
			}

			else{

				 main.userName = response.data.data.firstName;
				 cartService.currentUsername = main.userName;

				if(response.data.data.productStatus == false){
					// console.log("No products");
					main.productAvail = false;
				}
				else {
					main.productAvail = true;
					// console.log("products available");

				  main.recentProduct = response.data.data.product;
				  // console.log(main.recentProduct);
				}
			}

			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Post");
			})

		this.addToCart = function(){
			
			cartService.postCartApi(main.recentProduct._id)
			.then(function successCallback(response){

				 // console.log(response);
				 
				if(response.data.data==true){
				 	function alertAddCart(){

		      			main.alerts = true;
		      			main.alertText = response.data.message;
		      			$timeout(function() {
		         			main.alerts = false;
		         			$location.path('/cart/all');
		      			}, 1800);

   					};

   					alertAddCart();

				}
				
				else{
				 	alert(response.data.message);
				 } 
			
			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Post");
			})
	}
		
	}
])