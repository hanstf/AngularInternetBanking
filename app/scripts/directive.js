'user strict';

fypApp.directive('angSticky', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            UIkit.sticky(element);
        }
    }
});
fypApp.directive('angSly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
           var width = $(window).width();
            var slyCond = true;
            if (width<=768){
                slyCond = false;
            }
            $(element).sly({
                horizontal: slyCond,

                itemNav: 'basic',
                smart: true,
                activateOn: 'click',    
                scrollBy: 1,
                
                mouseDragging: 1,
                swingSpeed: 0.5,

                scrollBar: $(element.siblings('div')),
                dragHandle: 1,
                 dynamicHandle: true,
                
                speed: 600,
                startAt: 1
            })
        }
    }
});
