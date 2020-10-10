function getWrapperOffset() {
  $(".wrapper").css({
    "padding-top" : $("#header").height() + "px"
  });
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).load(function() {

});

$(window).resize(function() {
  getWrapperOffset();
});

$(document).scroll(function() {

});

$(document).ready(function() {
    getWrapperOffset();
    // if( $(".portfolio_slider").length > 0 ) {
    //     $(".portfolio_slider").not(".slick-initialized").slick({
    //         dots: true,
    //         arrows: true,
    //         autoplay: true,
    //         autoplaySpeed: 4000,
    //         speed: 1200,
    //         slidesToShow: 4,
    //         slidesToScroll: 1,
    //         // fade: true,
    //         responsive: [
    //             {
    //               breakpoint: 900,
    //               settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2
    //               }
    //             },
    //             {
    //               breakpoint: 540,
    //               settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //               }
    //             }
    //           ]
    //     });
    // }

    $(".drp_title").on("click", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".dropdown");
      dropdownBlock = parentBlock.find(".dropdown_box");
      if(dropdownBlock.is(":hidden")) {
        dropdownBlock.slideDown(300);
        parentBlock.addClass("active");
      } else {
        dropdownBlock.slideUp(300);
        parentBlock.removeClass("active");
      }
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
          $(".dropdown").each(function() {
            if($(this).hasClass("active")) {
              $(this).removeClass("active");
              $(this).find(".dropdown_box").slideUp(300);
            }
          });
      }
    });

    $(document).mouseup(function (e){
        e.preventDefault();
        var hide_element = $('.dropdown_box');        
        if (!hide_element.is(e.target)
                && hide_element.has(e.target).length === 0) {
                hide_element.closest(".dropdown").removeClass("active");
                hide_element.slideUp(300);
        }
    });

    function copyToClipboard(element) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($(element).text()).select();
      document.execCommand("copy");
      $temp.remove();
    }

    $(".copy_code").on("click", function(e) {
      e.preventDefault();
      copyToClipboard("#coupon-field");
    });

    // -----------------

    $(".green_box .close_btn").on("click", function(e) {
      e.preventDefault();
      $(this).closest(".green_box").remove();
      getWrapperOffset();
    });

});