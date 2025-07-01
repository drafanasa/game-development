var apikey = 'da092f706d214c318be258ddedaf1ff5';

//forceDownload();

function forceDownload() {
    if (typeof window.location.href.split('?')[1] != "undefined") {
        let param = window.location.href.split('?')[1]; 
        const urlParams = new URLSearchParams(param);
        const logged = urlParams.get('logged');
        if(logged) {
            download("https://gunnyvn.vcdn.vn/launcherv2/gunny_launcher_32bit.exe");
        }
    }
}

function dkn_callback(cbdata, acn, zid, uin, autcode, obj) {
    var param = "";
    if (typeof window.location.href.split('?')[1] != "undefined") {
        param = window.location.href.split('?')[1]; 
    }
    var urlencode = encodeURIComponent(location.protocol + '//' + siteUrl + '/launcher2');
    param = "cb=" + urlencode + "&" + param; 
    if (zid > 0) {
        var register_url = "https://id.gn.zing.vn/quick-play" + "?" + param;
        var login_url;
        if ($('#checklogin').attr('rel')) {
            login_url = "https://id.gn.zing.vn/quick-play" + $('#checklogin').attr('rel') + "&" + param;
        } else {
            login_url = "https://id.gn.zing.vn/quick-play" + "?" + param;
        }

        var u; 
        if (obj.register == true) {
            u = register_url;
            window.location.href = u;

        } else {
            if (typeof globObj != "undefined" && typeof globObj.regBtn != "undefined" && globObj.regBtn.size() && globObj.regBtn.hasClass("PlayNow")) {
                u = register_url;
                window.location.href = u;
            } else {
                u =  login_url;
                window.location.href = u;
            } 
        }
    } else {
        alert("Có lỗi xảy ra, vui lòng thử lại", 3000);
    }
}

function dkn_login() {
    //zmeOpenWidget.doLogin('dkn_callback');
    zmeOpenWidget.doRegister('dkn_callback');
    
}

// dkn_login(): show login tab

window.zAsyncInit = function() {
    zmeOpenWidget.init({
        apikey: apikey, //api key (public)
        pid: '49',
        callback: 'dkn_callback',
        /*tpl: '5',
        css: '//img.zing.vn/products/vendor/general/widget-login/css/login_quickreg_1.05.css'*/
        tpl: '6',
        css: '//stc-id.zing.vn/openwidget/css/login_quickreg_1.06.css'
    });
};
(function(d) {
    var js, id = 'widget-jssdk',
        ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    var t = Math.floor(Math.random() * 10000);
    js.src = "http://stc-id.zing.vn/widget/js/openwidget2.js?type=2&amp;t=" + t;
    ref.parentNode.insertBefore(js, ref);
}(document));


function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}


var guin = getCookie('gnuin');
if (guin != '' && guin != 'undefined' && guin != null) {
    document.getElementById("user").value = guin;
}

function download(filename) {
    var element = document.createElement('a');
    element.setAttribute('download', filename);
    element.href = filename;
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}