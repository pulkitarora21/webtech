/*
* @Customer controllers module
*/

(function(){

	angular.module("customer_module",["upper_directive"]);

	angular.module("customer_module").controller("customerInfoController",function($scope){
		 $scope.userInfo=localStorage.getItem("user");
	});
})();