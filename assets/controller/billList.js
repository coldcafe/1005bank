/**
 * Created by lhk on 2015/9/11.
 */
myApp.controller("billListCtrl",function ($rootScope,$scope,$cookies,$http){
    if(!$rootScope.user){
        $rootScope.loginModal.state=true;
    }else{
        $http.get($rootScope.config.DBUrl+"/bill?billUser="+$rootScope.user.id).success(function (data) {
            if(data){
                data.forEach(function(e){
                    e.createdAt = moment(e.createdAt).format('YYYY-MM-DD HH:mm');
                });
                $scope.billList = data;
            }
        });
    }
});
