/**
* @author: sajalrustagi1993@gmail.com
* @version  : 1.0
* directive for upper info
*/

(function(){
	angular.module("upper_directive",[]);
	angular.module("upper_directive").directive("userInfo",function(){
		return(
			restrict : 'EA',
			templateUrl: 'app/template/customerinfo.html',
			scope:false
			)
	};
})();

