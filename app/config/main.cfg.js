/**
* @author:puarora@adobe.com
* @version:1.0
* Main configuration file for routing 
*/

(function() {
	angular.module("main_module",["ngRoute","customer_module","upper_directive","service_module"]);

	angular.module("main_module").config(function($routeProvider,$locationProvider){
		$routeProvider
		
		.when("/customer",{
			templateUrl: 'app/page/customer_details.html'
		})

		.when("/",{
			templateUrl: 'app/page/restaurant.html'
		})
		
		.when("/menu/:id",{
			templateUrl: 'app/page/restaurant_details.html'
		})
		.when("/checkout",{
			templateUrl: 'app/page/checkout.html'
		})
		.otherwise({
			templateUrl: 'app/page/customer_details.html'
		})
	})
	
})();