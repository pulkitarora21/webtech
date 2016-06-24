/*
* @Customer controllers module
*/

(function(){

	angular.module("customer_module",["upper_directive"]);

	angular.module("customer_module").controller("customerInfoController",function($scope){
		 $scope.userInfo=JSON.parse(localStorage.getItem("user"));
	});

	angular.module("customer_module").controller("customerInfoController",function($scope){
		 $scope.userInfo=JSON.parse(localStorage.getItem("user"));
	});
})();