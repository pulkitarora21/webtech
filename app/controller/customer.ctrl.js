/*
* @Customer controllers module
*/

(function(){

	angular.module("customer_module",["upper_directive","service_module"]);

	angular.module("customer_module").controller("customerInfoController",function($scope){
		 $scope.userInfo=JSON.parse(localStorage.getItem("user"));
	});

	angular.module("customer_module").controller("RestaurantDetailsController",function($scope, $rootScope, $routeParams, RestaurantService){

		//$scope.menuItems = [];
		
		(function() {
			RestaurantService.getRestaurantDetails($routeParams.restaurantName).then(function(result){
				$scope.restaurantDetails = result.data[0];
				$scope.menuitems = $scope.restaurantDetails.menuItems;
				console.log($scope.restaurantDetails);
			});
		})();

		$rootScope.cartItems = {};
		$rootScope.currentRestaurant= "";
		$scope.addToCart = function(menuItem, restaurantName) {
			if($rootScope.currentRestaurant==""){
				$rootScope.currentRestaurant = restaurantName;
			}

			if(restaurantName!=$rootScope.currentRestaurant && Object.keys($rootScope.cartItems).length>0) {
				console.log("Can't add item from this restaurant while cart has items from other restaurants");
			}
			else {
				if($rootScope.cartItems[menuItem.name]==undefined) {
					$rootScope.cartItems[menuItem.name] = 1;
				}
				else {
					$rootScope.cartItems[menuItem.name] += 1;
				}
			}
		}


	});

})();