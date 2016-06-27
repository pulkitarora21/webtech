/**
* @author:puarora@adobe.com
* @version: 1.0
* Service code to interact with REST endpoints
*/

(function(){
	angular.module("service_module",[]); //creating module ------ without [] is getter for the module

	angular.module("service_module").service("RestaurantService",function($http,$q){
		
		this.getRestaurantDetails = function(name) {
			var deferred = $q.defer();
			$http.get("http://localhost:9000/restaurant?name="+name).then(
				function(data) {
					deferred.resolve(data);
				},
				function(data) {
					deferred.reject(data);
				}
			);
			return deferred.promise;
		}

		
	});
})();