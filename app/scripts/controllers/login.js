'use strict';

/**
 * @ngdoc function
 * @name angularFypApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFypApp
 */
fypApp.controller('loginController', ['$scope', '$routeParams', 'authenticationService', 'pageNavigationService', function ($scope, $routeParams, authenticationService, pageNavigationService) {
    
    $scope.contentStatus = false;
    $scope.userName="";
    $scope.passWord="";

    $scope.showContent = function (){
        if ($scope.contentStatus === false){
            $scope.contentStatus = true;
        }else{
            $scope.contentStatus = false;
        }
    };
   
    
    $scope.loginContent = function (){
        if ($routeParams.loginSpecific === "login"){
            return "login";
        }else if ($routeParams.loginSpecific === "firsttime"){
            return "firsttime";
        }else if ($routeParams.loginSpecific === "forgetpass"){
            return "forgetpass";
        }else{
            return "login";
        }
        
    };
    
    $scope.login = function(userName, passWord){
        
        authenticationService.login(userName, passWord)
            .then(function(){
                pageNavigationService.go("/account");
            });
                  
        
        
    }
    
    
}]);
