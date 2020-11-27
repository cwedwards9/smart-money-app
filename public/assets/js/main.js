(function ($) {
  "use strict";

  /*=============================================
    =            menu sticky and scroll to top            =
    =============================================*/

  /*----------  Menu sticky ----------*/

  var windows = $(window);
  var screenSize = windows.width();
  var sticky = $(".header-sticky");
  var stickyAbsolute = $(".header-sticky--absolute");
  var $html = $("html");
  var $body = $("body");

  windows.on("scroll", function () {
    var scroll = windows.scrollTop();
    var headerHeight = sticky.height();
    var headerHeightAbsolute = stickyAbsolute.height();

    if (screenSize >= 992) {
      if (scroll < headerHeight) {
        sticky.removeClass("is-sticky");
      } else {
        sticky.addClass("is-sticky");
      }

      if (scroll < headerHeightAbsolute) {
        stickyAbsolute.removeClass("is-sticky--absolute");
      } else {
        stickyAbsolute.addClass("is-sticky--absolute");
      }
    }

    //code for scroll top

    // if (scroll >= 400) {
    // 	$('#scroll-top').fadeIn();
    // } else {
    // 	$('#scroll-top').fadeOut();
    // }
  });

  /*----------  Scroll to top  ----------*/

  function scrollToTop() {
    var $scrollUp = $("#scroll-top"),
      $lastScrollTop = 0,
      $window = $(window);

    $window.on("scroll", function () {
      var st = $(this).scrollTop();
      if (st > $lastScrollTop) {
        $scrollUp.removeClass("show");
      } else {
        if ($window.scrollTop() > 200) {
          $scrollUp.addClass("show");
        } else {
          $scrollUp.removeClass("show");
        }
      }
      $lastScrollTop = st;
    });

    $scrollUp.on("click", function (evt) {
      $("html, body").animate({ scrollTop: 0 }, 600);
      evt.preventDefault();
    });
  }

  scrollToTop();

  /*=====  End of menu sticky and scroll to top  ======*/

  /*=============================================
    =            background image            =
    =============================================*/

  var bgSelector = $(".bg-img");
  bgSelector.each(function (index, elem) {
    var element = $(elem),
      bgSource = element.data("bg");
    element.css("background-image", "url(" + bgSource + ")");
  });

  /*=====  End of background image  ======*/

  /*=============================================
    =            mobile menu active            =
    =============================================*/

  $("#mobile-menu-trigger").on("click", function () {
    $("#mobile-menu-overlay").addClass("active");
    $body.addClass("no-overflow");
  });

  $("#mobile-menu-close-trigger").on("click", function () {
    $("#mobile-menu-overlay").removeClass("active");
    $body.removeClass("no-overflow");
  });

  /*=====  End of mobile menu active  ======*/



 
})(jQuery);
