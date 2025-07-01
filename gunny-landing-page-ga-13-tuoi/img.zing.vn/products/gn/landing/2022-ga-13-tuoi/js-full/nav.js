var ControlNavMB = $('.bg-top').find('.ControlNav');
var NavMB = $('.bg-top').find('#main-nav');
var navMobileVersion = $('.bg-top').find('#main-nav__list > li > a');

callMobile();

function callMobile () {
	navMobileVersion.bind ('click', function () {
		ControlNavMB.removeClass('Close');
		ControlNavMB.addClass('Open');
		if( $(this).hasClass('main-nav__has-sub')) {
			$(this).parent().find('ul').show();
			return false;
		}
		else {
			
			NavMB.removeClass('shown');
		}
	})
	ControlNavMB.unbind('click').bind('click', function () {
		if( $(this).hasClass('Open')) {
			$(this).removeClass('Open');
			$(this).addClass('Close');
			NavMB.addClass('shown');		
		}
		else {			
			$(this).removeClass('Close');
			$(this).addClass('Open');
			NavMB.removeClass('shown');
		}
		return false;
	})
		
}