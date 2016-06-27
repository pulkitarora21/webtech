/**
* @author:puarora@adobe.com
* @version: 1.0
* Service code to interact with REST endpoints
*/

(function(){
	angular.module("service_module",[]); //creating module ------ without [] is getter for the module

	angular.module("service_module").service("RestaurantService",function($http,$q){
		
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

		this.saveOrder = function(order) {
			$http.post("http://localhost:9000/orders/",order);
		};
	});

})();