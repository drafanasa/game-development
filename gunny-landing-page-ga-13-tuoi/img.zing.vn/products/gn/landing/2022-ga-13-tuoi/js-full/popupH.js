 $(document).ready(function(){
    //popup content
    $('#popupH').on('click', function(e){
        $(this).fadeOut(400);
        $('#popupH .popup-game').removeClass('active');
        $('#popupH .popup-game div').removeClass('active');
    });
    $('#popupH .btn-closePopup').on('click', function(e){
        $('#popupH').fadeOut(400);
        $('#popupH .popup-game').removeClass('active');
        $('#popupH .popup-game div').removeClass('active');
    });
    $('#popupH .popup-container').on('click', function(e){
        e.stopPropagation();
    });
    // popup form
    POPH = (function($) {
        return {
            'initPopup': (function($) {
                // POPUP CONTROL
                $('#popupDK .popup-container').on('click', function(e){
                    POPH.hidePopup();
                });
                $('#popupDK').on('mousewheel', function(e){
                    e.stopPropagation();
                });
                $('#popupDK .btn-closePopup').on('click', function(e){
                    POPH.hidePopup();
                });
                $('#popupDK .popup-container > div').on('click', function(e){
                    e.stopPropagation();
                });

            })(jQuery),

            'hidePopup': function () {
                // no param also do this
                
                $('#popupDK').fadeOut(200);
                $('#popupDK .popup-container > div').removeClass('active');
                
            },

            'showPopup': function (des, subdes) {
                // No param 1st do nothing, has param des in DOM do this
                if($(des).length > 0) {
                    POPH.hidePopup();
                    $('#popupDK').fadeIn(400);
                    $('#popupDK ' + des).addClass('active');
                }
                
            },
        };
    })(jQuery);
});
