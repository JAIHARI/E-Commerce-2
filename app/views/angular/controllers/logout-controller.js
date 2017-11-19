myApp.controller("LogoutController",["$http",'$location','cartService',function($http,$location,cartService){
	

		cartService.logoutApi()
		.then(function successCallback(response){

			// console.log(response.data);

			if(response.data.status == 200){

				alert(response.data.message);

				$location.path('/user/login');

			}

			else{

				alert(response.data.message);
			}


			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})
	}
])