/**
* directive for upper info
*/

(function(){
	angular.module("upper_directive",[]);
	angular.module("upper_directive").directive("userInfo",function(){
		return{
			restrict : 'EA',
			templateUrl: 'app/template/customerinfo.html',
			scope:false
			}
	});
	angular.module("upper_directive").directive("listSelector",function(){
		return{
			restrict : 'EA',
			templateUrl: 'app/template/listselector.html',
			scope:false
			}
	});
	angular.module("upper_directive").directive("listDisplay",function(){
		return{
			restrict : 'EA',
			templateUrl: 'app/template/listdisplay.html',
			scope:false
			}
	});
})();

