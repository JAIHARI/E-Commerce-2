

myApp.controller("DashController",["$http",'$location','cartService','$rootScope',function($http,$location,cartService,$rootScope){
	
	var main = this ; 
	
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
					console.log("No products");
					main.productAvail = false;
				}
				else {
					main.productAvail = true;
					console.log("products available");

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
				 console.log(response);
				 if(response.data.data.present==true){
				 	alert(response.data.message);
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