function isDefinedWithKey(obj, key) {
  return typeof obj !== 'undefined' && obj.hasOwnProperty(key);
}
$(document).ready(function () {
	var trackName = '';
	var trackType = '';
	var trackClick = '';
	var trackNow = '';
	var curDomain = window.location.hostname;
	$("a[data-track]").each(function(){
		trackNow = '';
		if ($(this).attr('onclick') !== undefined) {
			trackNow = $(this).attr('onclick');
		}
		trackName = $(this).data("track");
		trackType = trackName.split("-");
		if (trackName != '' && trackType.length >= 3) {
			var trackEvent = '';
			var trackChannel = '';
			var trackDownloadSource = '';
			if (trackType[0].includes('Download')) {
				trackEvent = 'click_download';
				trackDownloadSource = trackType[0].replace("Download", "");
			} else if (trackType[0] == 'Topup') {
				trackEvent = 'click_topup';
			} else if (trackType[0] == 'Entercode') {
				trackEvent = 'click_redeem_code';
			} else if (trackType[0] == 'Fanpage' || trackType[0] == 'Youtube' || trackType[0] == 'Tiktok' || trackType[0] == 'Groupfb') {
				trackEvent = 'click_social';
				trackChannel = trackType[0];
			}
			if (trackNow != '' ) {
				trackClick = "gtag('event', '" + trackType[0] + "', {'event_category': '" + trackType[1] + "','event_label': '" + trackType[2] + "'});dataLayer.push({'event':'event_tracking', 'event_name': '" + trackEvent + "', 'uid': 'Null', 'vga_id': 'Null', 'site_id': '" + curDomain + "', 'territory': '" + (isDefinedWithKey(trackType, '3') ? trackType[3] : 'Null') + "', data_info: {'position': '" + trackType[1] + "-" +trackType[2]+ " ','channel': '" + trackChannel + "','download_source': '" + trackDownloadSource + "'}});" + trackNow;
			}
			else {
				trackClick = "gtag('event', '" + trackType[0] + "', {'event_category': '" + trackType[1] + "','event_label': '" + trackType[2] + "'});dataLayer.push({'event':'event_tracking', 'event_name': '" + trackEvent + "', 'uid': 'Null', 'vga_id': 'Null', 'site_id': '" + curDomain + "', 'territory': '" + (isDefinedWithKey(trackType, '3') ? trackType[3] : 'Null') + "', data_info: {'position': '" + trackType[1] + "-" +trackType[2]+ " ','channel': '" + trackChannel + "','download_source': '" + trackDownloadSource + "'}});";
			}
			$(this).attr('onclick',trackClick);
		}
		
	});
});
//gtag('event', 'Ldplayer', {'event_category': 'Mainsite','event_label': 'Header','event_value': 'Button'});