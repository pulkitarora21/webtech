/*
* @Customer controllers module
*/

(function(){

	angular.module("customer_module",["upper_directive","service_module"]);

	angular.module("customer_module").controller("customerInfoController",function($scope){
		 $scope.userInfo=JSON.parse(localStorage.getItem("user"));
	});


	angular.module("customer_module").controller("restaurantDisplayController",function($scope){
		 $scope.allRestaurants=[];

		 (function(){
		 	RestaurantService.getAllRestaurants().then(function(result){
		 			$scope.allRestaurants=result.data;
		 			console.log($scope.allRestaurants);
		 		},
		 		{}
		 		);
		 })();
	});


})();