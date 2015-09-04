'use strict';



fypApp.config(function ($routeProvider) {
    $routeProvider
        
        .when("/login", {
            templateUrl: "/views/login/login.html",
            controller: "loginController",
            
        })
        .when("/login/:loginSpecific", {
            templateUrl: "/views/login/login.html",
            controller: "loginController",

        })
        .when("/account", {
            templateUrl: "/views/main/template.html",
            controller: "accountController",
            resolve: {
                auth: ["$q", "authenticationService", function ($q, authenticationService) {
                    var userInfo = authenticationService.getUserInfo();

                    if (userInfo) {
                        if (userInfo.stat === "fail") {
                            return $q.reject({
                                authenticated: false
                            });
                        } else {
                            return $q.when(userInfo.stat);
                        }
                    } else {
                        return $q.reject({
                            authenticated: false
                        });
                    }
    }]
            }
        })
        .when("/account/:accountSpecific/:tasktype", {
            templateUrl: "/views/main/template.html",
            controller: "accountController",
            resolve: {
                auth: ["$q", "authenticationService", function ($q, authenticationService) {
                    var userInfo = authenticationService.getUserInfo();

                    if (userInfo) {
                        if (userInfo.stat === "fail") {
                            return $q.reject({
                                authenticated: false
                            });
                        } else {
                            return $q.when(userInfo.stat);
                        }
                    } else {
                        return $q.reject({
                            authenticated: false
                        });
                    }
    }]
            }
        })
        
});

fypApp.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
      

    });
    
    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
    
    $rootScope.validation={
    "wronguserpass": {
        "status": false,
        "icon": "uk-icon-warning", 
        "message":"Wrong username or password",
        "class": "tm-alert-danger",
        "animate": false
    },
    "loginsuccess": {
        "status": false,
        "icon": "uk-icon-check", 
        "message":"Successful Authentication",
        "class": "tm-alert-success",
        "animate": false
    }
};
}]);