var DnDMoM = {};
(function($) {
    var contentHeight = 960;
    var pcWidth = 2000;
    var mobileWidth = 768;
    
    var $rzObj = $('#outer');
    var $rzObj2 = $('.bg-top, .nav, .sidebar-right, .sidebar-left, .popup-game, .popup-luudanh, .popup-thanhcong');
    var $rzPopup = $('');
    var ratio = 1;

    // recalculate width height of windows every resize (windows first load also run resize)
    $(window).on('load resize', function() {
        var size = $(this).outerWidth();
        
        if ($(window).width() > 1024) {
            ratio = size/pcWidth;
            resizeObject($rzObj, ratio, 1, 'w');
            resizeObject($rzObj2, ratio, 0, 'w');
        }
        else {
            ratio = size/mobileWidth;
            resizeObjectMobile($rzObj, ratio, 1, 'w');
            resizeObjectMobile2($rzObj2, ratio, 0, 'w');
        }
    });
    
    function resizeObject($rzObj, lastRatio, isReCalculate, type) {
        $rzObj.css({
            'transform': 'scale(' + lastRatio + ')',
        });
        //var heightIframe = $(".frame-2").outerHeight() * lastRatio;
        //$(".iframe-header").css('height',heightIframe);
        if(isReCalculate == 1) {
            if(type == 'h') {
                $rzObj.parent().css('height', $rzObj.outerHeight() * lastRatio + 'px');
            }else {
                $rzObj.parent().css({
                    height: $rzObj.outerHeight() * lastRatio,
                });
            }
        }
    };
    function resizeObjectMobile($rzObj, lastRatio) {
        $rzObj.css({
            'transform': 'scale(' + lastRatio + ')'
        });
        var heightTop = $('.bg-top').outerHeight() * lastRatio;
        

        $('body').css('height', $("#outer").outerHeight() * lastRatio);
        
    }
    function resizeObjectMobile2($rzObj, lastRatio) {
        $rzObj.css({
            'transform': 'scale(' + lastRatio + ')'
        });
    } 

})(jQuery);



