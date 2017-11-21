myApp.controller("CreateProdController",["$http",'$location','cartService',function($http,$location,cartService){
	

	var main = this;
	
	this.productName;
	this.category;
	this.price;
	this.addInfo;
	this.availIn;

	this.submitCreate = function(){

		var createdData = {

				productName  		: main.productName,
				category			: main.category,
				price				: main.price,
				color				: main.color,
				addInfo				: main.addInfo,
				availIn	  			: main.availIn
		}
		cartService.postProdApi(createdData)
		.then(function successCallback(response){

			// console.log(response.data);

			if(response.data.status == 200){


				alert(response.data.message);

				$location.path('/user/dashboard');

			}

			else{

				alert(response.data.message);
				$location.path('/')
			}


			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})
		}
	}
])