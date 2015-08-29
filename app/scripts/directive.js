'user strict';

fypApp.directive('angSticky', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            UIkit.sticky(element);
        }
    }
});
fypApp.directive('angSly', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            
            var width = $(window).width();
            var slyCond = true;
            if (width <= 768) {
                slyCond = false;
            };
                console.log(scope.$last);
            if (scope.$last === true) {
                
                $timeout(function () {
                    
                    var frame = $(element[0]).parent().parent();

                    frame.sly({
                        horizontal: slyCond,

                        itemNav: 'basic',
                        smart: true,
                        activateOn: 'click',
                        scrollBy: 1,

                        mouseDragging: 1,
                        swingSpeed: 0.5,

                        scrollBar: $(element[0]).parent().parent().siblings('div'),
                        dragHandle: 1,
                        dynamicHandle: true,

                        speed: 600,
                        startAt: 1
                    })


                });
            }

        }
    }
});