/*
* @Customer controllers module
*/

(function(){

	angular.module("customer_module",["upper_directive","service_module"]);

	angular.module("customer_module").controller("customerInfoController",function($scope){
		 $scope.userInfo=JSON.parse(localStorage.getItem("user"));
	});

	angular.module("customer_module").controller("MenuItemsController",function($scope, $routeParams, RestaurantService){

		//$scope.menuItems = [];
		
		(function() {
			RestaurantService.getMenuItems($routeParams.restaurantName).then(function(result){
				$scope.menuItems = result.data;
				console.log($scope.menuItems);
			});
		})();
	});



	angular.module("customer_module").controller("customerLoginController",function($scope){


		$scope.userInfo=JSON.parse(localStorage.getItem("user"));
		$scope.newInfo = {};

		$scope.name = null;
		$scope.address = null;

		 $scope.updateCustomer = function () {
		 	$scope.userInfo = {};
		 	$scope.userInfo.name = $scope.name;
		 	$scope.userInfo.address = $scope.address;
		 	console.log($scope.newInfo);
		 	localStorage.setItem("user", JSON.stringify($scope.newInfo));
		 	document.body.style.backgroundImage = 'none';
		 	window.location.replace("#/");
		 };
	
		var init = function () {
		   	document.body.style.backgroundImage = "url('/images/restaurant.jpg')";
			document.body.style.backgroundSize= "cover";

			console.log(localStorage.getItem("user"));
			if(localStorage.getItem("user")){
				console.log("redirecting");
				document.body.style.backgroundImage = 'none';
				window.location.replace("#/");
			}
		};

		init();
	});

})();
	