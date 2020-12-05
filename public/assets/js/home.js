// Scroll effect
(function ($) {
  "use strict";
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
  /*----------  background image  ----------*/
    var bgSelector = $(".bg-img");
    bgSelector.each(function (index, elem) {
      var element = $(elem),
        bgSource = element.data("bg");
      element.css("background-image", "url(" + bgSource + ")");
    });
    /*=====  End of background image  ======*/
  })(jQuery);



// Modal functionality for registering and logging in
let modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.getAttribute('data-modal');
        document.getElementById(modal)
            .style.display = "block";
    }
});

let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.closest('.modal');
        modal.style.display = "none";
    }
});

window.onclick = function (event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
}

$(document).ready(function(){
  $("form").submit(function(){
    alert("Thank you for signing up. Please log in.");
  });
});