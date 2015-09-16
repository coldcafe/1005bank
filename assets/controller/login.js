/**
 * Created by lhk on 2015/9/11.
 */
myApp.controller("loginCtrl",function ($rootScope,$scope,$cookies,$http){
    $scope.userForm = {
        name:"",
        password:"",
        remmenberMe:false,
        login:function(){
            $http.get($rootScope.config.DBUrl+"/user?name="+$scope.userForm.name+"&password="+$scope.userForm.password).success(function (data) {
                if(data.length==1){
                    //登录成功
                    $rootScope.user={
                        id : data[0].id,
                        name : data[0].name,
                        sex : data[0].sex,
                        birthday : data[0].birthday,
                        tel : data[0].tel
                    }
                    if($scope.userForm.remmenberMe){
                        console.log('remmemberMe');
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 15);
                        $cookies.putObject('user', $rootScope.user,{'expires': expireDate});
                    }else{
                        $cookies.putObject('user', $rootScope.user);
                    }
                    $scope.loginResult = "登录成功";
                    window.location.reload();
                }else{
                    //用户名或密码错误
                    $scope.loginResult = "用户名或密码错误";
                }
            });
        }
    }

});