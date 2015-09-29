/**
 * Created by lhk on 2015/9/11.
 */
myApp.controller("settlementCtrl",function ($rootScope,$scope,$cookies,$http){
    if(!$rootScope.user){
        $rootScope.loginModal.state=true;
    }else{
        $scope.getSettlement = function() {
            $http.get($rootScope.config.DBUrl + "/settlement?state=0&sort=createdAt DESC&limit=1").success(function (doc) {
                if(doc[0]) {
                    console.log(doc[0].needPayList);
                    $rootScope.needPayList = doc[0].needPayList;
                    $rootScope.showSettlementModal.show();
                }else{
                    alert('暂时还没有待结算订单');
                }
            });
        };
        $scope.addSettlement = function(){
            $http.get($rootScope.config.DBUrl + "/settlement?state=0&sort=createdAt DESC&limit=1").success(function (doc) {
                if(doc[0]){
                    alert('还有待结账订单');
                    $scope.getSettlement();
                }else{
                    $http.get($rootScope.config.DBUrl+"/settlement/goingToSettle?userId="+$rootScope.user.id).success(function (ret) {
                        if(ret.goingToSettle) {
                            $http.get($rootScope.config.DBUrl + "/settlement/addSettlement").success(function (doc) {
                                if (doc.error) {
                                    alert(doc.error);
                                } else {
                                    if(doc.notAll){
                                        console.log(doc.needPayList);
                                        $rootScope.needPayList = doc.needPayList;
                                        $rootScope.showSettlementModal.show();
                                    }else {
                                        $scope.getSettlement();
                                    }
                                }
                            });
                        }else{
                            alert(ret.error);
                        }
                    });
                }
            });

        }
    }
});