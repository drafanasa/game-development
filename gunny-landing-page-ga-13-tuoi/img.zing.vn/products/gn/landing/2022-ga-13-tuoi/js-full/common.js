var isFirefox = typeof InstallTrigger !== 'undefined';
var winWidth = $(window).width();
var winHeight = $(window).height();

var indexPage = 0;
var aniComplete = true;
var ratioPopup = winWidth/2000;
var ratioMobile = winWidth/768;
    $(document).ready(function(){
    $("#main-nav li a").bind('click',function() {
        if ($(this).hasClass('off')) {
            return false;
        }
        else {
            indexPage = parseInt($(this).attr("rel"));
            
            $("#main-nav li a").removeClass("active");
            $(this).addClass("active");
            callPage(indexPage);
            return false;
        }
    });
    if($('#event-ga .swiper-container').length != 0) {
        var swiper = new Swiper(".event-nav", {
            spaceBetween: 0,
            slidesPerView: 5,
            
            
            freeMode: true,
            watchSlidesProgress: true,
        });
        var swiper2 = new Swiper(".event-content", {
            spaceBetween: 0,
            //allowTouchMove: false,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            /*navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },*/
            
            thumbs: {
              swiper: swiper,
            },
        });
    }

    var actIframe = '';
    $('.open-popup').on('click', function() {
        $('#popupH .popup-game iframe').attr("src",'');
        actIframe = $(this).data('href');
        var parentOff = $(this).parent().hasClass('off');
        if ( actIframe == '' || parentOff) { return false;}
        else {
            $('#popupH .popup-game iframe').attr("src",actIframe);
            $('#popupH').fadeIn(400);
            $('#popupH .popup-game').addClass('active');
            return false;
        }
    });
    
    $('#sharefb, .bt-share').on('click',function(){
        var alink = window.location.href;
        // console.log(alink);
        window.open('https://www.facebook.com/sharer/sharer.php?u='+ alink +'&hashtag=%23TânOMG3Q','facebook-share-dialog','width=500,height=500');
        return false;
    });
    /*$('.bt-diemdanh').on('click', function(){
        POPH.showPopup('.popup-luudanh');
    });*/
})
 
function callPage(n) {
    var posTop = 0;
    if (n==0) {
       posTop = $('.slide').eq(n).offset().top;
    }
    else {
        posTop = $('.slide').eq(n).offset().top - (90 * ratioMobile);
    }
    $("body,html").animate({
        scrollTop: posTop
    }, 500, function() {

    });
    /*$("#main-nav ul li").removeClass("active");
    $("#main-nav ul li").eq(n).addClass("active");*/
}


function detectios() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
}