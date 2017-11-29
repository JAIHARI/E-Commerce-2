

myApp.controller("cartController",["$http",'$location','cartService','$rootScope',function($http,$location,cartService,$rootScope){
	
	var main = this ; 
	this.cartItems=[];
	this.showCartIcon = true;

	$rootScope.showNav = true; 

		cartService.getCartApi()
		.then(function successCallback(response){
			console.log(response);

			// console.log(response.data.data);
			
			if(response.data.userLog == false){
					alert(response.data.message)
					$location.path('/');
				}

			else{
				
				//IF NO PRODUCTS ARE IN CART
				if(response.data.data.inCart == false){
					console.log("I worked");
					main.showCartIcon == true;
				}

				else if(response.data.data[0].cart.length>0){
					main.showCartIcon = false;

					main.cartItems = response.data.data[0].cart;
					console.log(main.cartItems);
				}
			}


		}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})

		// FUNCTION TO DELETE ITEM FROM CART

		this.deleteItem = function(id){

			cartService.deleteCartApi(id)
			.then(function successCallback(response){
				console.log(response);


				if(response.data.status ==200 && response.data.data.productDel == true){
					alert(response.data.message);
					$location.path('cart/all');
				}

			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})
		}
}])