/**
 * Created by lhk on 2015/9/11.
 */
myApp.controller("settlementCtrl",function ($rootScope,$scope,$cookies,$http){
    if(!$rootScope.user){
        $rootScope.loginModal.state=true;
    }else{
        $http.get($rootScope.config.DBUrl + "/bill/getAmount?userId="+$rootScope.user.id).success(function(data){
            if(data) {
                $scope.billAmount = data.amount;
            }
        });
        $http.get($rootScope.config.DBUrl + "/order/getAmount?userId="+$rootScope.user.id).success(function(data){
            if(data) {
                $scope.orderAmount = data.amount;
            }
        });
    }
});