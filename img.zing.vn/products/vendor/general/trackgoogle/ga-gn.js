(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-12221861-7', 'auto');
  ga('send', 'pageview');
 
 //Chuyen tracking event tu ga push sang ga send
 

jQuery(document).ready(function () {
  if (typeof ga != 'undefined' || typeof _gaq != 'undefined') {
     
    if (typeof _gaq == 'undefined') {
      _gaq = {
        push : function (arr) {
          ga('send', 'event', arr[1], arr[2], arr[3], 1);
        }
      };
    } else if (typeof ga == 'undefined') {
      ga = function (a, b, c, d, e, f) {
        // _gaq.push();
        _gaq.push(['_trackEvent', c, d, e, f]);
      }
    }
  }
});

