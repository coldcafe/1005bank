/**
 * Created by lhk on 2015/9/10.
 */
myApp.controller("userCtrl",function ($rootScope,$scope,$cookies,$http){

    if(!$rootScope.user){
        $rootScope.loginModal.state=true;
    }else{
        //注销
        $scope.logout = function(){
            console.log('logout');
            delete $rootScope.user;
            $cookies.remove('user');
            $rootScope.loginModal.state = true;
        }
    }



});