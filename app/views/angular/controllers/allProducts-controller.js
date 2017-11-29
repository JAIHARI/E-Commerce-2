myApp.controller("AllProdController",["$http",'$location','cartService','$rootScope',function($http,$location,cartService,$rootScope){
	
	var main = this;
	$rootScope.showNav = true;
	
	this.allProducts = [];
	
		cartService.getAllApi()
		.then(function successCallback(response){
			// console.log(response);

			if(response.data.status ==200 && response.data.userLog == false){
				
				alert(response.data.message);

				$location.path('/');
			}	

			 else if(response.data.status == 200){

			 	//displaying latest products using array's reverse method
				main.allProducts = response.data.data.reverse();
				// console.log(main.allProducts);
				// cartService.recentProduct = main.allProducts[main.allProducts.length-1];
			}

			else{
				console.log("I worked");

				alert(response.data.message);
				$location.path('/');
				
			}


			}, function errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})
		}
])


//  <!-- ERROR MESSAGE -->
//    <div id='errorMessage' ng-if='loginCtrl.message !==null' class="col s12 card ">
//        <h5>{{loginCtrl.message}}</h5>
//    </div>
// //INCONTROLLER PARTLA
// self.message = null;
// this.loginHandler = function() {

      

//        $http.post('/api/login', self.data)
//            .then((response) => {
//                self.loader = false;

//                console.log(response)
//                if (response.data.error) {
//                    self.message = response.data.message; // HERE PUT ERROR MESSAGE THEN IT WILL SHOW
//                }

//                if (!response.data.error) {

//                    $location.path('profile')
//                }

//            })
//            .catch((err) => {
//                console.log(err);
//            })


//    }