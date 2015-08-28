'use strict';

/**
 * @ngdoc function
 * @name angularFypApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFypApp
 */
fypApp.controller('accountController', ['$scope', '$routeParams', '$timeout', 'authenticationService', 'pageNavigationService', 'accountService', 'detailService','$location', function ($scope, $routeParams, $timeout, authenticationService, pageNavigationService, accountService, detailService, $location) {
    
    $scope.accountTypeTaskMapping = [{"type": "saving", "task":["overview", "transfer", "payment", "statement request"]
    }, {"type": "current", "task":["overview", "transfer", "payment", "cheque service","statement request"]}, {"type": "fixeddeposit", "task":["overview", "placement"]}, {"type": "loan", "task":["overview", "repayment"]}];
    
    $scope.transTypelist = ["favourite", "thirdparty", "otherbank", "mobile"];
    $scope.payTypelist = ["favourite", "payee"];
    
    
    $scope.transSteplist = [["selectrecipient", "tm-step-tracker-done"], ["selectdetails", "tm-step-tracker-todo"], ["confirmation", "tm-step-tracker-todo"]];
    
    $scope.paySteplist = [["selectpayee", "tm-step-tracker-done"], ["enteramount", "tm-step-tracker-todo"], ["confirmation", "tm-step-tracker-todo"]];
     
    $scope.assetsChartData = {
        series: [{
            value: 499000.00,
            className: "ct-saving"
        }, {
            value: 249750.00,
            className: "ct-current"
        }, {
            value: 249750.00,
            className: "ct-fixeddeposit"
        }],
        labels: ['saving', 'current', 'fixed deposit']
    };

    $scope.liabilitiesChartData = {
        series: [{
            value: 22771.75,
            className: "ct-loan"
        }],
        labels: ['loan']
    }
    
    $scope.accountCategory =[
    {"name": "assets",
        "status": "",
        "style": "tm-bold",
        "iconposition" : "main-show-assets",
        "id": "assets-account",
        "background": "tm-back-assets",
        "data": accountService.getAssetAccountSummary(), 
        "chartdata": $scope.assetsChartData,
        "total" : "68315.25"
    },
    {"name": "liabilities", 
        "status": "uk-hidden-small",
        "style": "",
      "iconposition" : "main-show-liabilities",
     "id": "liabilities-account",
     "background" : "tm-back-liabilities",
     "data": accountService.getLiabilitiesAccountSummary(),
     "chartdata": $scope.liabilitiesChartData,
     "total" : "22771.75"
    }
];
    $scope.getMappedTask = function (type){
            var tasklist=[];
           $scope.accountTypeTaskMapping.forEach(function(key){
            if(key.type == type){
                tasklist = key.task;
            }
        });
        return tasklist;
    }
    $scope.openCanvas = function () {
        UIkit.offcanvas.show('#tm-offcanvas');
    }
    
    $scope.transStep = 0;
    $scope.payStep = 0;

    


    $scope.payType = "favourite";
    $scope.transType = "favourite";

    $scope.clock = '';
    $scope.tickInterval = 1000;


    $scope.currentTransPosition = $scope.transSteplist[$scope.transStep][0];
    $scope.currentPayPosition = $scope.paySteplist[$scope.payStep][0];
    
    $scope.mainAccountNavSelected = function (route) {
        
        return route === $location.path();
    }    
    $scope.transTypeClass = function (type) {
        return type === $scope.transType;
    }    
    $scope.payTypeClass = function (type) {
        return type === $scope.payType;
    }    
    
    $scope.accountData = detailService.accountData;
    var tick = function () {
        $scope.clock = Date.now();
        $timeout(tick, $scope.tickInterval);
    }
    $scope.removeSpace = function (string){
      return  string.replace(/\s+/, "");     
    }

    $scope.hideAccountCategory= function(category){
        $scope.accountCategory.forEach(function(key){
            if(key.name == category){
                key.status ="";
                key.style = "tm-bold";
            }else{
                key.status ="uk-hidden-small";
                key.style = "";    
            }
        });
        
    }

    $scope.nextTransStep = function () {
        $scope.transStep = $scope.transStep + 1;
        $scope.currentTransPosition = $scope.transSteplist[$scope.transStep][0];
        $scope.transSteplist[$scope.transStep][1] = "tm-step-tracker-done";

    }
    $scope.prevTransStep = function () {
        $scope.transStep = $scope.transStep - 1;
        $scope.currentTransPosition = $scope.transSteplist[$scope.transStep][0];
        $scope.transSteplist[$scope.transStep][1] = "tm-step-tracker-done";
    }
    $scope.nextPayStep = function () {
        $scope.payStep = $scope.payStep + 1;
        $scope.currentPayPosition = $scope.paySteplist[$scope.payStep][0];
        $scope.paySteplist[$scope.payStep][1] = "tm-step-tracker-done";

    }
    $scope.prevPayStep = function () {
        $scope.payStep = $scope.payStep - 1;
        $scope.currentPayPosition = $scope.paySteplist[$scope.payStep][0];
        $scope.paySteplist[$scope.payStep][1] = "tm-step-tracker-done";
    }
    $scope.checkNoBack = function(type){
        if (type=="transfer"){
        if( $scope.transStep <=0){
            return true;
        }else {
            return false;
        }
        }else if(type=="payment"){
             if( $scope.payStep <=0){
            return true;
        }else {
            return false;
        }
        }
        
    }
    
    $scope.switchTranstype = function (transtype) {
        $scope.transType = transtype;
    }
    $scope.switchPaytype = function (paytype) {
        $scope.payType = paytype;
    }
    $scope.accountContent = function () {
        if ($routeParams.accountSpecific === "overview") {
            return "overview";
        } else if ($routeParams.accountSpecific === "details") {
            return "details";
        } else {
            return "overview";
        }

    };



    $scope.specificContent = function () {
        if ($routeParams.tasktype == "overview") {
            return "overview";
        } else if ($routeParams.tasktype == "transfer") {
            return "transfer"
        } else if ($routeParams.tasktype == "payment") {
            return "payment"
        } else {
            return "overview";
        }
    }

    $scope.logOut = function () {
        authenticationService.deleteUserInfo().then(function () {
            pageNavigationService.go('/login');
        })

    }

    $scope.gotoAccountSpecific = function (task, accountDetails) {
       detailService.accountData = accountDetails;
       pageNavigationService.go('account/details/'+task);
    }
    
     $scope.$watch('mobilePosition', function() {
       console.log($scope.mobilePosition);
    });

    
    $scope.getAccountDetails = function () {
        return detailService.accountData;
    }

    
    $scope.historyData = {
        labels: ['May', 'June'],
        series: [{
                value: [1, 2],
                className: "ct-history"
        }, {
                value: [2, 4],
                className: "ct-history"
        }, {
                value: [5, -2],
                className: "ct-history"
        },
            {
                value: [5, -2],
                className: "ct-history"
        },
            {
                value: [5, -2],
                className: "ct-history"
        }, {
                value: [5, -2],
                className: "ct-history"
        }]
    }

    $scope.fullData = {
        labels: ['', ''],
        series: [{
                value: [14, 14],
                className: "ct-back"
        }, {
                value: [14, 14],
                className: "ct-back"
        }, {
                value: [14, 14],
                className: "ct-back"
        },
            {
                value: [14, 14],
                className: "ct-back"
        },
            {
                value: [14, 14],
                className: "ct-back"
        }, {
                value: [14, 14],
                className: "ct-back"
        }]
    }

    $scope.pieOptions = {
        donutWidth: 20,
        donut: true,
        showLabel: false,
        chartPadding: 0,
        width: '175px',
        height: '175px'
    };

    $scope.historybarOptions = {
        high: 7,
        low: -7,
        stackBars: false,
        axisX: {
            labelInterpolationFnc: Chartist.noop,
            showGrid: true
        },
        axisY: {
            showLabel: false,
            showGrid: true
        },
        horizontalBars: false,
        seriesBarDistance: 35,
        height: '300px'
    };

    $scope.backbarOptions = {
        high: 14,
        low: 0,
        stackBars: false,
        axisX: {
            labelInterpolationFnc: Chartist.noop,
            showGrid: false
        },
        axisY: {
            showLabel: false,
            showGrid: false
        },

        horizontalBars: false,
        seriesBarDistance: 35,
        height: '300px'
    };

    $scope.slyOptions = {
        horizontal: 1,

        itemNav: 'forceCentered',
        smart: 1,
        activateOn: 'click',

        scrollBy: 1,

        mouseDragging: 1,
        swingSpeed: 0.2,

        scrollBar: $('.scrollbar'),
        dragHandle: 1,

        speed: 600,
        startAt: 2
    };
    
    $scope.responsiveBarOptions = [
    ['screen and (min-width: 1026px) ', {
            seriesBarDistance: 35,
        height: '300px'
  }],    
        ['screen and (min-width: 1024px) and (max-width: 1025px)', {
            seriesBarDistance: 24,
        height: '250px'
  }], 
  ['screen and (min-width: 768px) and (max-width: 1023px)', {
            seriesBarDistance: 16,
        height: '250px'
  }],
  ['screen and (max-width: 767px)', {
           seriesBarDistance: 16,
        height: '200px',
   
  }]
];
    $scope.responsivePieOptions = [
     ['screen and (min-width: 1025px) ', {
            width: '175px',
        height: '175px'
  }],    
  ['screen and (min-width: 768px) and (max-width: 1024px)', {
           width: '172px',
        height: '172px'
  }],
  ['screen and (max-width: 767px)', {
          width: '150px',
        height: '150px'
   
  }]
    ];
    $timeout(tick, $scope.tickInterval);


}]);