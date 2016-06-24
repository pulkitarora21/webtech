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

})();