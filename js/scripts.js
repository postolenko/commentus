function getWrapperOffset() {
  $(".wrapper").css({
    "padding-top" : $("#header").height() + "px"
  });
}

function getPillsParams(checkboxesArray) {  
  if(checkboxesArray.find(".priceVal").length > 0) {

    priceVal = parseInt( checkboxesArray.find(".priceVal").text() );      
    if(priceVal == 0 || priceVal == "") {
      checkboxesArray.find(".pills_wrapp").addClass("disabled");
    } else {
      checkboxesArray.find(".pills_wrapp").removeClass("disabled");
    }

  } else {

    checkboxesArray.find(".ch_childrens").each(function() {
      if($(this).find("input").is(":checked")) {
        checkboxesArray.find(".pills_wrapp").removeClass("disabled");
        return false;
      } else {
        checkboxesArray.find(".pills_wrapp").addClass("disabled");
      }
    });
    
  }




}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

$(window).load(function() {

    $(".tabs").each(function() {
        $(this).find(".tab-link").each(function() {
            if( $(this).hasClass("active") ) {
                indexActiveTab = $(this).attr("for");
                return false;
            } else {
                parentBlock = $(this).closest(".tabs");
                indexActiveTab = parentBlock.find(".tab-link:eq(0)").attr("for");
            }
        });
        $(this).find("#"+indexActiveTab).prop("checked", true);
        $(this).find("[for = '"+indexActiveTab+"']").addClass("active");
    });

});

$(window).resize(function() {
  getWrapperOffset();
});

$(document).scroll(function() {

});

$(document).ready(function() {
    getWrapperOffset();

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

    // -----------------

    $(".custom_select_title").on("click", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".custom_select");
      dropdownBlock = parentBlock.find(".custom_select_dropdown");
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
          $(".custom_select").each(function() {
            if($(this).hasClass("active")) {
              $(this).removeClass("active");
              $(this).find(".custom_select_dropdown").slideUp(300);
            }
          });
      }
    });

    $(document).mouseup(function (e){
        e.preventDefault();
        var hide_element = $('.custom_select_dropdown');        
        if (!hide_element.is(e.target)
                && hide_element.has(e.target).length === 0) {
                hide_element.closest(".custom_select").removeClass("active");
                hide_element.slideUp(300);
        }
    });

    $(".custom_select_dropdown p").on("click", function(e) {
      e.preventDefault();
      value = $(this).text();
      parentBlock = $(this).closest(".custom_select");
      inputHidden = parentBlock.find("input[type='hidden']");
      inputHidden.val(value);
      selectTitle = parentBlock.find(".custom_select_title p");
      selectTitle.text(value);
      $(this).closest(".custom_select_dropdown").slideUp(300);
      parentBlock.removeClass("active");
    });

    // -------------

    $(".tab-link").click(function (e) {
      if( $(this).hasClass("active") ) {
          e.preventDefault();
      } else {
          tabsParent = $(this).closest(".tabs");
          attrForTabLink = $(this).attr("for");
          activeTabRadio = tabsParent.find(".radio-tab[id = '"+ attrForTabLink +"']");
          activeTabRadio.prop("checked", true);
          tabsParent.find(".tab-link").each(function () {                
              if( $(this).hasClass("active") ) {
                  $(this).removeClass("active")
              }
          });
          $(this).addClass("active");
      }
    });

    // -------------

    $(".checkboxes_array").each(function() {
      parentBlock = $(this);
      getPillsParams(parentBlock);
      getPrice(parentBlock);
    });

    $(".main_checkbox input").on("change", function() {
        parentBlock = $(this).closest(".checkboxes_array");
        chChildrens = parentBlock.find(".ch_childrens input");
        if($(this).is(":checked")) {
            chChildrens.prop("checked", true);
        } else {
            chChildrens.prop("checked", false);
        }
        getPillsParams(parentBlock);
        getPrice(parentBlock)
    });
    
    $(".ch_childrens input").on("change", function() {
        parentBlock = $(this).closest(".checkboxes_array");
        chChildrens = parentBlock.find(".ch_childrens input");
        mainCheckbox = parentBlock.find(".main_checkbox input");
        chChildrens.each(function() {
            if(!$(this).is(":checked")) {
                mainCheckbox.prop("checked", false);
                return false;
            } else {
                mainCheckbox.prop("checked", true);
            }
        });
        getPillsParams(parentBlock);
        getPrice(parentBlock);
    });

    $(".price_table .radio input").on("change", function() {
      parentBlock = $(this).closest(".price_table");
      getPrice(parentBlock);
    });

    function getPrice(parentBlock) {
      payTable = parentBlock.find(".table");
      tableRow = payTable.find(".table_row");  
      price = 0;
      tableRow.each(function() {
        filterCheckbox = $(this).find(".ch_childrens input");
        if(filterCheckbox.is(":checked")) {
          radio = $(this).find(".radio input");
          radio.each(function() {
            if( $(this).is(":checked") ) {
              radioVal = parseInt($(this).val());
              price += radioVal;
            }
          });
        }
      });
      if(price != 0 || price != "") {
        parentBlock.find(".pills_wrapp").removeClass("disabled");
      } else {
        parentBlock.find(".pills_wrapp").addClass("disabled");
      }  
      parentBlock.find(".priceVal").text(price);
    }

    // ---------------
    // -- Валидация --
    // ---------------

    $("[type='submit']").on("click", function(e) {
      e.preventDefault();
      error = 0;
      this_form = $(this).closest("form");
        this_form.find('input, textarea, .custom_select_title').removeClass('error');
        if(this_form.find('input').is('input[type="text"]')) {
            text = this_form.find('input[type="text"]');
            if(typeof text.attr('required') != typeof undefined) {
                if(text.val().length <= 1) {
                    text.addClass('error');
                    error = 1;
                }
            }
        }
        if(this_form.find('input').is('input[type="email"]')) {
            email = this_form.find('input[type="email"]');
            if(typeof email.attr('required') != typeof undefined) {
                if(!email.val().match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/)) {
                    email.addClass('error');
                    error = 1;
                }
            }
        }
        if(this_form.find('input').is('input[type="tel"]')) {
            tel = this_form.find('input[type="tel"]');
            if(typeof tel.attr('required') != typeof undefined) {
                if(tel.val().length <= 1) {
                    tel.addClass('error');
                    error = 1;
                }
            }
        }
        if(this_form.find('input').is('input[type="password"]')) {
            password = this_form.find('input[type="password"]');
            if(typeof password.attr('required') != typeof undefined) {
                if(password.val().length <= 1) {
                    password.addClass('error');
                    error = 1;
                }
            }
        }
        if(this_form.find('textarea')) {
            textarea = this_form.find('textrea');
            if(typeof textarea.attr('required') != typeof undefined) {
                if(textarea.val().length <= 1) {
                    textarea.addClass('error');
                    error = 1;
                }
            }
        }
        if(this_form.find('.custom_select')) {
            customSelectInput = this_form.find('.custom_select input');
            if(typeof customSelectInput.attr('required') != typeof undefined) {
                if(customSelectInput.val() == "") {
                    customSelect = customSelectInput.closest(".custom_select");
                    customSelect.find(".custom_select_title").addClass('error');
                    error = 1;
                }
            }
        }
        if(error==1) {
            return false;
        }
        // $.ajax({
        // });
    });

    // -----------

    $("input[type='email']").inputmask("email");

    // -----------

    $(".respmenubtn").on("click", function(e) {
      e.preventDefault();
      $("#respNav").toggleClass("visible");
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
          $("#respNav").removeClass("visible");
      }
    });

    $(document).mouseup(function (e){
        e.preventDefault();
        var hide_element = $('#respNav');        
        if (!hide_element.is(e.target)
                && hide_element.has(e.target).length === 0) {
                hide_element.removeClass("visible");
        }
    });

    // -----------

    var OSName;
    if (navigator.appVersion.indexOf("Mac")!=-1)  $("body").addClass("ios");
    if (navigator.appVersion.indexOf("X11")!=-1) $("body").addClass("ios");
    if (navigator.appVersion.indexOf("Linux")!=-1) $("body").addClass("ios");

    if($("body").hasClass("ios")) {
      $("img").each(function() {
        if($(this).attr("data-src") != "") {
          $(this).attr("src", $(this).attr("data-src"));
        }        
      });
    }

});