/**
* @author:puarora@adobe.com
* @version: 1.0
* Service code to interact with REST endpoints
*/

(function(){
	angular.module("service_module",[]); //creating module 

	angular.module("service_module").service("RestaurantService",function($http,$q){
		
		// Get details of a restaurant whose id is passed
		this.getRestaurantDetails = function(id) {
			var deferred = $q.defer();
			$http.get("http://localhost:9000/restaurant/"+id).then(
				function(data) {
					deferred.resolve(data);
				},
				function(data) {
					deferred.reject(data);
				}
			);
			return deferred.promise;
		}

		// Get details of all the restaurants
		this.getAllRestaurants=function(){
			var deferred=$q.defer();
			$http.get("http://localhost:9000/restaurant").then(
				function(data) {
				deferred.resolve(data);	
				},
				function(data){
					deferred.reject(data);
				}
			);
			return deferred.promise;
		} 

		// Save details of the order
		this.saveOrder = function(order) {
			$http.post("http://localhost:9000/orders/",order);
		};
	});

})();