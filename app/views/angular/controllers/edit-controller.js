

myApp.controller("EditDeleteController",["$http",'$location','cartService','$rootScope','$routeParams',function($http,$location,cartService,$rootScope,$routeParams){
	
	var main = this ; 
	
	this.product = {};
	this.productId = $routeParams.id;
	this.showForm = false;
	this.showProduct = true;

	$rootScope.showNav = true; //Showing navbar for Dashboard page

	cartService.getProdApi(this.productId)
		.then(function successCallback(response){
			console.log(response);

			if(response.data.userLog == false){
				alert(response.data.message)
				$location.path('/');
			}

			else{

				main.product = response.data.data;
				 console.log(main.product);
				
			}

		}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Post");
			})

	this.deleteProduct = function(){
		var toDelete = confirm("Are you sure of deleting this product ?");

		if(toDelete == true){

			cartService.deleteProdApi(main.productId)
			.then(function successCallback(response){
				console.log(response);

				if(response.data.userLog == false){
					alert(response.data.message)
					$location.path('/');
				}

				else{
					
					$location.path('/product/all');
				}

			}, function errorCallback(reason){
					console.log(reason);
					alert("Error in Post");
				})
		}
		else{
			//do nothing
		}
	};

	// function to show and hide product and form
	this.showHide = function(){
		main.showForm = true;
		main.showProduct = false;
	}
	
		this.editProduct = function(){

			var toEditData = {

				productName  		: main.product.productName,
				category			: main.product.category,
				price				: main.product.price,
				color				: main.product.color,
				additionalInfo		: main.product.additionalInfo,
				availableIn	  		: main.product.availableIn
			}

			cartService.editProdApi(main.productId,toEditData)
			.then(function successCallback(response){
				console.log(response);

				if(response.data.userLog == false){
					alert(response.data.message)
					$location.path('/');
				}

				else{

					main.product = response.data.data;
					console.log(main.product)
					main.showForm = false;
					main.showProduct = true;
					$location.path('/product/all');
					 
				}

			}, function errorCallback(reason){
					console.log(reason);
					alert("Error in Post");
				})
		};
	}
])