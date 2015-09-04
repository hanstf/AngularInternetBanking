'use strict';

/**
 * @ngdoc overview
 * @name angularFypApp
 * @description
 * # angularFypApp
 *
 * Main module of the application.
 */
var fypApp = angular
    .module('fypApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'angular-chartist',
    'cn.offCanvas',
    'sticky',
    'ngLoadingSpinner'
  ]);



fypApp.factory("authenticationService", ['$http', '$q', '$sessionStorage', function ($http, $q, $sessionStorage) {
    var userInfo;
    
    function login(userName, passWord) {

        var deferred = $q.defer();
        $http.post("http://localhost/angularFYP/app/data/testlogin.php", {
            userName: userName,
            passWord: passWord
        }).then(function (result) {

            userInfo = {
                'stat': result.data.stat
            };
            $sessionStorage.userInfo = userInfo;
            deferred.resolve(userInfo);
        }, function (error) {
            
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getUserInfo() {
        return $sessionStorage.userInfo;
    }

    function noUserInfo() {
        if ($sessionStorage.userInfo === null) {
            return true;
        } else {
            return false;
        }

    }

    function deleteUserInfo() {
        var deferred = $q.defer();
        $http.post("http://localhost/angularFYP/app/data/testlogout.php", {}).then(function (result) {
            delete $sessionStorage.userInfo;
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    return {
        login: login,
        getUserInfo: getUserInfo,
        deleteUserInfo: deleteUserInfo,
        noUserInfo: noUserInfo
    }
}]);

fypApp.service("detailService", [function () {
    this.accountData = {};
}]);

fypApp.factory("pageNavigationService", ['$location', function ($location) {
    function go(path) {
        $location.path(path);
    }

    return {
        go: go
    }
}]);

fypApp.factory("accountService", ['$http', '$resource', function ($http, $resource) {
    var assetsAPI = $resource('data/assetsummary_data.json', {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "GET"
        }
    });
    var liabilitiesAPI = $resource('data/liabilitiessummary_data.json', {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "GET"
        }
    });

    function getAssetAccountSummary() {
        return assetsAPI.get({});
    }

    function getLiabilitiesAccountSummary() {
        return liabilitiesAPI.get({});
    }

    return {
        getAssetAccountSummary: getAssetAccountSummary,
        getLiabilitiesAccountSummary: getLiabilitiesAccountSummary
    }
}]);
fypApp.filter('titleCase', function () {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
});
fypApp.factory('myOffCanvas', ['cnOffCanvas', function (cnOffCanvas) {
  return cnOffCanvas({
     controller: 'navCtrl',
    controllerAs: 'nav',
    templateUrl: 'views/off-canvas.html'
  })
}]);
fypApp.controller('navCtrl', [ 'myOffCanvas', function (myOffCanvas) {
  this.toggle = myOffCanvas.toggle;
}]);
fypApp.controller('MyOffCanvasCtrl', ['myOffCanvas', function (myOffCanvas) {
  this.toggle = myOffCanvas.toggle;
}]);

