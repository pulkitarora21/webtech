/*
* @Customer controllers module
*/

(function(){

	angular.module("customer_module",["upper_directive","service_module"]);

	angular.module("customer_module").run(function($rootScope, $location) {
        $rootScope.changeUserInfo = function () {
			$rootScope.change=true;
			$location.path("/customer");
		} 

		$rootScope.changeView = function(view) {
			$location.path(view);
		}
    });

	// Fetching user information from local storage
	angular.module("customer_module").controller("customerInfoController",function($scope , RestaurantService){
		 $scope.userInfo=JSON.parse(localStorage.getItem("user"));
	});


	angular.module("customer_module").controller("RestaurantDetailsController",function($scope, $rootScope, $location, $routeParams, RestaurantService){

		//$scope.menuItems = [];
		(function() {
			// Get details of the restaurant whose id is passed 
			RestaurantService.getRestaurantDetails($routeParams.id).then(function(result){
				$rootScope.restaurantId = $routeParams.id;
				$scope.restaurantDetails = result.data;
				$scope.menuitems = $scope.restaurantDetails.menuItems;
				console.log($scope.restaurantDetails);
			});

			// Initialise totalPrice variable of rootScope to 0
			if($rootScope.totalPrice==undefined) {
				$rootScope.totalPrice = 0;
			}
		})();

		// $rootScope.cartItems = {};
		// $rootScope.currentRestaurant= "";
		// $rootScope.totalPrice = 0;

		// Add an item to cart
		$scope.addToCart = function(menuItem, restaurantId) {
			// Initialise variables when first item is added to cart
			if($rootScope.currentRestaurant==undefined){
				$rootScope.currentRestaurant = restaurantId;
				$rootScope.cartItems = {};
				$rootScope.priceItems = {};
				$rootScope.totalPrice = 0;
			}

			// IF there are items in cart from some other restaurants - don't allow this item to be added to cart
			if(restaurantId!=$rootScope.currentRestaurant && Object.keys($rootScope.cartItems).length>0) {
				console.log("Can't add item from this restaurant while cart has items from other restaurants");
				alert("Can't add item from this restaurant while cart has items from other restaurants. Empty your cart first!");
			}
			else { // Otherwise add the item to the cart
				$rootScope.currentRestaurant = restaurantId;
				if($rootScope.cartItems[menuItem.name]==undefined) {
					$rootScope.cartItems[menuItem.name] = 1;
					$rootScope.priceItems[menuItem.name] = menuItem.price;
					$rootScope.totalPrice += menuItem.price;
				}
				else {
					$rootScope.cartItems[menuItem.name] += 1;
					$rootScope.totalPrice += menuItem.price;
				}
				$rootScope.totalPrice = Math.round($rootScope.totalPrice*100)/100;
			}
		};

		// Remove an item from the cart
		$scope.removeItem = function(cartItem) {
			$rootScope.totalPrice -= $rootScope.cartItems[cartItem]*$rootScope.priceItems[cartItem];
			$rootScope.totalPrice = Math.round($rootScope.totalPrice*100)/100;
			delete $rootScope.cartItems[cartItem];
		}

		// Clear the cart
		$rootScope.clearCart = function() {
			$rootScope.currentRestaurant = undefined;
			$rootScope.cartItems = {};
			$rootScope.priceItems = {};
			$rootScope.totalPrice = 0;
		};

	});

	angular.module("customer_module").controller("OrderDetailsController",function($scope, $rootScope, RestaurantService) {
		
		$scope.success=false;

		// Re-calculate totalPrice 
		$scope.updateTotal = function() {
			totalPrice = 0;
			Object.keys($rootScope.cartItems).forEach(function(cartItem) {
				totalPrice += $rootScope.cartItems[cartItem]*$rootScope.priceItems[cartItem];
			});
			$rootScope.totalPrice = Math.round(totalPrice*100)/100;
		}

		
		// Save order details
		$scope.purchase = function() {
			if($rootScope.cartItems!=undefined && Object.keys($rootScope.cartItems).length > 0) {
				order = {};
				order['restaurantId']= $rootScope.currentRestaurant
				order['cartItems'] = $rootScope.cartItems;
				order['totalPrice'] = $rootScope.totalPrice;
				RestaurantService.saveOrder(order);

				$scope.success=true;

				$scope.clearCart()
			}
			else {
				$scope.noitem = true;
			}
		}
	});


	angular.module("customer_module").controller("restaurantDisplayController",function($scope,RestaurantService){
		 $scope.allRestaurants=[];
		 $scope.orderByField = 'rating';
  		 $scope.reverseSort = false;

  		 $scope.filter=[];
  		 $scope.filter['chinese']=true;
  		 $scope.filter['indian']=true;
  		 $scope.filter['thai']=true;
  		 $scope.filter['vegetarian']=true;
  		 $scope.range = new Array(5);


		 (function(){
		 	// Get details of all the restaurants
		 	RestaurantService.getAllRestaurants().then(function(result){
		 			$scope.allRestaurants=result.data;
		 			},{}
		 		);
		 })();

		
		 // Filter restaurants by cuisine
		 $scope.filterBy = function () {
		    return function (restaurant) {
		      if ( $scope.filter[restaurant.cuisine] === true ) {
		        return true;
		      }
		    }
  		};
	});



	angular.module("customer_module").controller("customerLoginController",function($scope , $rootScope , RestaurantService){


		$scope.userInfo=JSON.parse(localStorage.getItem("user"));

		$scope.newInfo = {};

		if($scope.userInfo){
			$scope.newInfo = $scope.userInfo;
		}

		$scope.name = null;
		$scope.address = null;

		// Update User information
		$scope.updateCustomer = function () {
			$scope.userInfo = {};
			$scope.userInfo.name = $scope.name;
			$scope.userInfo.address = $scope.address;
			console.log($scope.newInfo);
			localStorage.setItem("user", JSON.stringify($scope.newInfo));
			document.body.style.backgroundImage = 'none';
			window.location.replace("#/");
		};

		$scope.$on('$routeChangeStart', function(next, current) { 
				document.body.style.backgroundImage = 'none';
		 });
		
		// Initialisation for the first page
		var init = function () {
		   	document.body.style.backgroundImage = "url('/images/restaurant.jpg')";
			document.body.style.backgroundSize= "cover";

			console.log(localStorage.getItem("user"));
			if( localStorage.getItem("user") &&
				(typeof $rootScope.change!= 'undefined' && $rootScope.change==false)){
				console.log("redirecting");
				document.body.style.backgroundImage = 'none';
				window.location.replace("#/");
			}

			$rootScope.change=false;
		};

		init();

	});

})();
	
