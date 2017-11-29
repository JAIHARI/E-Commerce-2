myApp
.controller("CreateProdController",["$http",'$location','cartService','$timeout',
	function($http,$location,cartService,$timeout){
	

	var main = this;

	this.alerts = false;
	this.alertText = '';
	
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

				function alertShow(){

	      			main.alerts = true;
	      			main.alertText = response.data.message;
	      			$timeout(function() {
	         			main.alerts = false;
	         			$location.path('/user/dashboard');
	      			}, 1500);

   				};

   				alertShow();

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