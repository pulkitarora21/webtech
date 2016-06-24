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
})();

