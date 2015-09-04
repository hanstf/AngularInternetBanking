'use strict';

/**
 * @ngdoc function
 * @name angularFypApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFypApp
 */
fypApp.controller('loginController', ['$scope', '$rootScope', '$timeout','$routeParams', 'authenticationService', 'pageNavigationService', function ($scope, $rootScope, $timeout, $routeParams, authenticationService, pageNavigationService) {
    
    $scope.contentStatus = false;
    $scope.userName="";
    $scope.passWord="";
    $scope.left = "firsttime";
    $scope.right = "forgetpass";
    $scope.showContent = function (){
        if ($scope.contentStatus === false){
            $scope.contentStatus = true;
        }else{
            $scope.contentStatus = false;
        }
    };
   
    $scope.goSpecificTask= function(task){
        pageNavigationService.go('login/' + task);
    }
    
    $scope.loginContent = function (){
        if ($routeParams.loginSpecific === "login"){
            $scope.left = "login";
            $scope.right = "forgetpass";
            return "login";
        }else if ($routeParams.loginSpecific === "firsttime"){
            $scope.left = "forgetpass";
            $scope.right = "firsttime";
            return "firsttime";
        }else if ($routeParams.loginSpecific === "forgetpass"){
            $scope.left = "login";
            $scope.right = "firsttime";
            return "forgetpass";
        }else{
            return "login";
        }
        
    };
    
    $scope.login = function(userName, passWord){
         
        
        authenticationService.login(userName, passWord)
            .then(function(){
                var userInfo = authenticationService.getUserInfo();
                
                    if(userInfo.stat == "fail"){
                        
                        $timeout(function(){$rootScope.validation.wronguserpass.animate = false;}, 1000);
                        $rootScope.validation.wronguserpass.animate = true;
                        $rootScope.validation.wronguserpass.status = true;
                       
                    }else{
                        
                        $rootScope.validation.wronguserpass.status = false;
                        $rootScope.validation.loginsuccess.status = true;
                        
                        pageNavigationService.go("/account");
                    }
                
                
            });
                  
        
        
    }
    
    
}]);
