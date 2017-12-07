

myApp.controller("DashController",["$http",'$location','cartService','$rootScope','$timeout','SweetAlert'
	function($http,$location,cartService,$rootScope,$timeout,SweetAlert){
	
	var main = this ; 

	// ALERT, WHEN PRODUCT ALREADY PRESENT IN CART
	this.alerts = false;
	this.alertText ='';
	
	//ALERT, WHEN PRODUCT ADDED TO CART
	this.addAlerts = false;
	this.addAlertText ='';

	this.userProducts = [];
	this.productAvail;
	this.recentProduct;
	this.userName;

	$rootScope.showHome =false; 
	$rootScope.showCart =true; 
	$rootScope.showLogout =true;

	this.showForm = false;

		cartService.dashboardApi()
		.then(function successCallback(response){
			console.log(response);

			if(response.data.userLog == false){
				
				SweetAlert.swal({
					
				   title: ""+response.data.message+"",
				   type: "info",
				   showCancelButton: false,
				   confirmButtonColor: "#5cb85c",confirmButtonText: "Ok!",
				   closeOnConfirm: true}, 
					function(){ 
				   		$location.path('/');
				   		
				});
			}

			else{

				 main.userName = response.data.data.firstName;
				 cartService.userFirstName = main.userName ;

				if(response.data.data.userProducts != null){
					main.productAvail = true;
					console.log("products available");

				  main.recentProduct = response.data.data.userProducts;
				  console.log(main.recentProduct);
					
				}

				else {

					console.log("No products");
					main.productAvail = false;
				}
			}

			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Post");
			})

		this.addToCart = function(){
			
			var toCart = {
				alertMessage : true,
				itemCount : null // RANDOM VALUE TO CHECK REFERENCE OF THE VIEW
			};
	
			cartService.postCartApi(main.recentProduct._id,toCart)
			.then(function successCallback(response){
				 console.log(response);
				 
				 //IF PRODUCT ALREADY EXISTS

				if(response.data.status==200 && response.data.data==true){
				 	function alertAddCart(){

		      			main.alerts = true;
		      			main.alertText = response.data.message;
		      			$timeout(function() {
		         			main.alerts = false;
		      			}, 2000);

   					};

   					alertAddCart();

				}
				
				//IF PRODUCT IS ADDED TO CART 
				else if(response.data.status==200 && response.data.data.addedToCart==true){

				 	function alertAddCart(){

		      			main.addAlerts = true;
		      			main.addAlertText = response.data.message;
		      			$timeout(function() {
		         			main.addAlerts = false;
		         			
		         			$location.path('/cart/all');
		      			}, 1300);

   					};

   					alertAddCart();

				 } 
			
			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Post");
			})
	}
		
	}
])