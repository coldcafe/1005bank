/**
 * Created by lhk on 2015/9/10.
 */

var myApp = angular.module('myApp',["mobile-angular-ui","ui.router","ngCookies"]);
myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/welcome");
    $stateProvider
        .state('welcome', {
            url: "/welcome",
            views: {
                "bodyView": { templateUrl: "/views/welcome.html" }
            }
        }).state('billList', {
            url: "/billList",
            views: {
                "bodyView": { templateUrl: "/views/billList.html" }
            },
            controller: 'billListCtrl'
        }).state('payList', {
            url: "/payList",
            views: {
                "bodyView": { templateUrl: "/views/payList.html" }
            },
            controller: 'payListCtrl'
        }).state('payForm', {
            url: "/payForm",
            views: {
                "bodyView": { templateUrl: "/views/payForm.html" }
            },
            controller: 'payFormCtrl'
        }).state('settlement', {
            url: "/settlement",
            views: {
                "bodyView": { templateUrl: "/views/settlement.html" }
            },
            controller: 'settlementCtrl'
        }).state('userInfo', {
            url: "/userInfo",
            views: {
                "bodyView": { templateUrl: "/views/userInfo.html" }
            },
            controller: 'userInfoCtrl'
        });
});

myApp.controller("appCtrl",function($rootScope,$scope,$cookies,$http){

//----控制模态框开关函数

    //登录
    $rootScope.loginModal = {
        state:false,
        show:function(){
            $rootScope.loginModal.state = true;
        },
        hide:function(){
            $rootScope.loginModal.state = false;
        }
    };
    //选择参与人
    $rootScope.joinPayModal = {
        state:false,
        show:function(){
            $rootScope.joinPayModal.state = true;
        },
        hide:function(){
            $rootScope.joinPayModal.state = false;
        }
    };

//---*控制模态框开关函数---END

//----config，配置信息
    $rootScope.config={
        DBUrl:''
//        DBUrl:'http://pccece.vicp.cc:10556'
    };

//---*config，配置信息---END


//----缓存cacheDate，用于缓存controller需要共同访问的数据
    $rootScope.cacheDate={};

//---*缓存cacheDate---END

    //判断cookie中是否存有用户，没有则打开登录模态框
    if($cookies.getObject('user')){
        $rootScope.user=$cookies.getObject('user');
    }else{
        $rootScope.loginModal.state=true;
    }
});