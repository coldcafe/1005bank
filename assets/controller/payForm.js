/**
 * Created by lhk on 2015/9/11.
 */
myApp.controller("payFormCtrl",function ($rootScope,$scope,$cookies,$http){
    if(!$rootScope.user){
        $rootScope.loginModal.state=true;
    }else{
        if(!$rootScope.cache.userList){
            $http.get($rootScope.config.DBUrl+"/user?group=1005").success(function (data) {
                $rootScope.cache.userList = data;
            });
        }
        //模态框内选择参与人
        $scope.selectJoinPay = {
            userList:$rootScope.cache.userList,
            selectJoin:function(){
                console.log('selectJoin');
                $rootScope.cache.joinPayList = [];
                $scope.selectJoinPay.userList.forEach(function(e){
                    if(e.select){
                        $rootScope.cache.joinPayList.push(e);
                    }
                });
                $rootScope.joinPayModal.hide();
            }
        }

        $scope.busy = false;
        //记账表单
        $scope.payForm = {
            title:'',
            pic:'',
            money:'',
            joinPayList:[],
            ok:function(){
                if(!$scope.busy) {
                    $scope.busy = true;
                    $scope.payForm.joinPayList = [];
                    $rootScope.cache.joinPayList.forEach(function (e) {
                        $scope.payForm.joinPayList.push({id: e.id, name: e.name});
                    });
                    $http.post($rootScope.config.DBUrl + "/order", {title: $scope.payForm.title, money: $scope.payForm.money, joinPayList: $scope.payForm.joinPayList, payUser: $rootScope.user.id}).success(function (data) {
                        if (data) {
                            var i = 0;
                            data.joinPayList.forEach(function (each) {
                                $http.post($rootScope.config.DBUrl + "/bill", {orderId: data.id, title: data.title, money: ItoDecimal2(data.money / data.joinPayList.length), joinPayList: $scope.payForm.joinPayList, billUser: each.id}).success(function (result) {
                                    if (result) {
                                        i++;
                                        if (i == data.joinPayList.length) {
                                            alert('记账成功');
                                            $scope.busy = false;
                                        }
                                    }
                                });
                            });
                        }
                    });
                }
            }
        }
    }
    function ItoDecimal2(number) {
        return Math.round(number * Math.pow(10,2))/Math.pow(10,2);
    }
});