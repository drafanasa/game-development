
var donedk = false;

/*$(".close-popup").click(function (e) {
  e.preventDefault();
  $(".popup--default").removeClass("active");
});*/

var errorsForm = 1;

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function validPhone(phone) {
  if (phone.length >= 10 && phone.length <= 11) return true;
  else return false;
}

function validEmail() {
  $("#email").on("focusout", function () {
    var email = $("#email").val();
    if (email == undefined || email == "" || !ValidateEmail(email)) {
      $(".error-text")
        .addClass("active")
        .text("Vui lòng nhập chính xác email!");
      $(this).css("color", "#ff2700");
      errorsForm = 1;
    } else {
      $(".error-text").removeClass("active");
      $(this).removeAttr("style");
      errorsForm = 0;
    }
  });
}

function validatePhone() {
  $("#phone-number").on("focusout", function () {
    var phoneNumber = $("#phone-number").val();
    if (
      phoneNumber == undefined ||
      phoneNumber == "" ||
      isNaN(phoneNumber) ||
      !validPhone(phoneNumber)
    ) {
      $(".error-text")
        .addClass("active")
        .text("Vui lòng nhập chính xác số phone!");
      $(this).css("color", "#ff2700");
      errorsForm = 1;
    } else {
      $(".error-text").removeClass("active");
      $(this).removeAttr("style");
      errorsForm = 0;
    }
  });
}

function validCapcha() {
  $("#vrf").on("focusout", function () {
    var capcha = $("#vrf").val();
    if (capcha == undefined || capcha == "") {
      $(".error-text")
        .show()
        .text("Không tải được hình captcha. Vui lòng reload lại page");
      $(this).focus().css("color", "#ff2700");
      errorsForm = 1;
      initCapchar();
    } else {
      $(".error-text").removeClass("active");
      $(this).removeAttr("style");
      errorsForm = 0;
    }
  });
}


$(function ($) {
  //test
  
  $(".cta-dk").click(function (e) {
    if (!donedk) {
      validEmail();
      validatePhone();
      POPH.showPopup('.popup-luudanh');
    } else {
      POPH.showPopup('.popup-thanhcong');
    }
  });
  
  $(".bt-submit").bind("click", function () {
    $("p.error-text").text("");
    if (errorsForm == 0) {
      //post ajax
      var postData = $("#reg__form").serialize();
      var urlRequest = domain + "/pre-register.json";
      $.ajax({
        url: urlRequest,
        dataType: "json",
        method: "POST",
        data: postData,
        success: function (data) {
          if (data.regSuccess !== 1) {
            $(".error-text").addClass("active");
            if (data.errors.captcha != undefined) {
              $("p.error-text").text("Vui lòng nhập captcha");
              // initCapchar();
              grecaptcha.reset();
            }
            if (data.errors.phone != undefined) {
              if (data.errors.phone == 'Existed') {
                $("p.error-text").text("Số phone đã được đăng ký");
              } else {
                $("p.error-text").text("Vui lòng nhập chính xác số phone");
              }              
            }
            if (data.errors.email != undefined) {
              if (data.errors.email == 'Existed') {
                $("p.error-text").text("Email đã được đăng ký");
              } else {
                $("p.error-text").text("Vui lòng nhập chính xác email");
              }
            }
            if (data.errors.phone != undefined && data.errors.phone == 'Existed' && data.errors.email != undefined && data.errors.email == 'Existed' && data.errors.user != undefined) {
              donedk = true;
              $('#popupDK .popup-luudanh').removeClass('active').hide();
              $('#popupDK .popup-thanhcong #reg-username').text(data.errors.user.name);
              $('#popupDK .popup-thanhcong #reg-phone').text(data.errors.user.phone);
              $('#popupDK .popup-thanhcong #reg-email').text(data.errors.user.email);
              $('#popupDK .popup-thanhcong #reg-lucky').text(data.errors.user.id);
              $('#popupDK .popup-thanhcong').addClass('active');
            }
          } else {
            //window.open($(".r-dk").attr("href"), "_blank");
            donedk = true;
            //$(".r-dk")[0].click();
            $('#popupDK .popup-luudanh').removeClass('active').hide();

            $('#popupDK .popup-thanhcong #reg-username').text(data.eData.name);
            $('#popupDK .popup-thanhcong #reg-phone').text(data.eData.phone);
            $('#popupDK .popup-thanhcong #reg-email').text(data.eData.email);
            $('#popupDK .popup-thanhcong #reg-lucky').text(data.eData.luckyNumber);
            $('#popupDK .popup-thanhcong').addClass('active');
          }
        },
      });
    } else {
      $(".error-text").text("");
    }
    return false;
  });
  if ($('#countRegisterLink').val() != undefined && $('#countRegisterLink').val() != '') {
    $.ajax({
      url: $('#countRegisterLink').val(),
      dataType: "json",
      success: function (data) {
        var extra = $("#countRegisterExtra").val();
        var genNumb = data.total;
        var finalNumb;
        finalNumb = parseInt(genNumb) + (Number.isNaN(parseInt(extra)) ? 0 : parseInt(extra));
        finalNumb = String(finalNumb);
        if (finalNumb.length < 5 ) {
          var lengthZero = 5 - finalNumb.length;
          switch (lengthZero) {
            case 4 :
              finalNumb = '0000' + finalNumb;
              break;
            case 3 :
                finalNumb = '000' + finalNumb;
                break;
            case 2 :
              finalNumb = '00' + finalNumb;
              break;
            case 1 :
              finalNumb = '0' + finalNumb;
              break;
            default:
              finalNumb = '0' + finalNumb;
              break;
          }

          // for (var i = 5; i > finalNumb.length; i--) {
          //   finalNumb = '0' + finalNumb;
          // }
        }
        $('.reg-count span').text(finalNumb);
        /*var processPer = 0;
        if (finalNumb <= 2000 ) {
          processPer = (finalNumb)*10/2000
        } else if (finalNumb > 2000 && finalNumb <= 5000) {
          processPer = 10 + (finalNumb - 2000)*27/3000;
        } else if (finalNumb > 5000 && finalNumb <= 10000) {
          processPer = 37 + (finalNumb - 5000)*27/5000;
        } else if (finalNumb > 10000 && finalNumb <= 20000) {
          processPer = 64 + (finalNumb - 10000)*27/5000;
        } else if (finalNumb > 20000 ) {
          processPer = 100;
        }
        $('.progress__loading').css({
            'width': processPer + '%'
          })
        $.each(data.code, function(index, val){
          $('ul.code-text').append('<li><span style="margin-right:20px;">Copy Code</span>'+val+'</li>');
        })*/
      },
      error: function (xhr, ajaxOptions, thrownError) {},
    });
  }
  $(".refresh").on("click", function () {
    initCapchar();
  });
});
