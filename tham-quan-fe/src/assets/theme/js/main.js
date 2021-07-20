"use strict";
(function ($) {
  $(window).on('load', function () {
    /* -------------------------------------
        PRELOADER
    -------------------------------------- */
    $(window).ready(function () {
      $(".preloader-outer").delay(1000).fadeOut();
      $(".loader").delay(500).fadeOut("slow");
    });

    /* -------------------------------------
        OPEN CLOSE
    -------------------------------------- */
    $('#sj-languages-button').on('click', function (event) {
      event.preventDefault();
      $('.sj-languages > ul').slideToggle();
    });
    /*--------------------------------------
        COUNTER
    --------------------------------------*/
    if ($('#sj-counters').length > 0) {
      var _tg_counters = $('#sj-counters');
      _tg_counters.appear(function () {
        $('.sj-timer').countTo()
      });
    }
    /*--------------------------------------
        THEME ACCORDION
    --------------------------------------*/
    if ($('.sj-panelheading').length > 0) {
      var _tg_panelheading = $('.sj-panelheading');
      _tg_panelheading.on('click', function () {
        $('.panel-heading').removeClass('active');
        $(this).parents('.panel-heading').addClass('active');
        $('.panel').removeClass('active');
        $(this).parent().addClass('active');
      });
    }
    /* -------------------------------------
        WELCOME SLIDER
    -------------------------------------- */
    var _sj_welcomeimgslider = $('#sj-welcomeimgslider');
    if (_sj_welcomeimgslider.hasClass('sj-welcomeslider')) {
      _sj_welcomeimgslider.owlCarousel({
        items: 1,
        nav: false,
        loop: true,
        dots: true,
        autoplay: true,
        dotsClass: 'sj-sliderdots',
        navClass: ['sj-prev', 'sj-next'],
        navContainerClass: 'sj-slidernav',
        navText: ['<span class="icon-chevron-left"></span>', '<span class="icon-chevron-right"></span>'],
      });
    }
    /* -------------------------------------
        EDITOR CHOICE SLIDER
    -------------------------------------- */
    var _sj_editorchoiceslider = $('#sj-editorchoiceslider');
    if (_sj_editorchoiceslider.hasClass('sj-editorschoice')) {
      _sj_editorchoiceslider.owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        dots: false,
        autoplay: true,
        dotsClass: 'sj-sliderdots',
        navClass: ['sj-prev', 'sj-next'],
        navContainerClass: 'sj-slidernav',
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      });
    }
    /* -------------------------------------
        ISSUES SLIDERS
    -------------------------------------- */
    var _sj_homeslidersame = $('[id="sj-issuesslider-2018"], [id="sj-issuesslider-2017"], [id="sj-issuesslider-2016"], [id="sj-issuesslider-2015"], [id="sj-issuesslider-2014"], [id="sj-issuesslider-2013"]');
    if (_sj_homeslidersame.hasClass('sj-issuesslider')) {
      _sj_homeslidersame.owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        dots: false,
        autoplay: false,
        dotsClass: 'sj-sliderdots',
        navClass: ['sj-prev', 'sj-next'],
        navContainerClass: 'sj-slidernav',
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      });
    }
    /* -------------------------------------
        UPCOMING BOOKS SLIDER
    -------------------------------------- */
    var _sj_upcomingbooksslider = $('#sj-upcomingbooksslider');
    if (_sj_upcomingbooksslider.hasClass('sj-upcomingbooks')) {
      _sj_upcomingbooksslider.owlCarousel({
        items: 4,
        nav: true,
        margin: 20,
        loop: true,
        dots: false,
        autoplay: true,
        responsiveClass: true,
        dotsClass: 'sj-sliderdots',
        navClass: ['sj-prev', 'sj-next'],
        navContainerClass: 'sj-slidernav',
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: { items: 2, },
          567: { items: 3, },
          991: { items: 4, },
          992: { items: 5, }
        }
      });
    }
    /* -------------------------------------
        NEWS ARTICLES SLIDER
    -------------------------------------- */
    var _sj_newsarticlesslider = $('#sj-newsarticlesslider');
    if (_sj_newsarticlesslider.hasClass('sj-newsarticles')) {
      _sj_newsarticlesslider.owlCarousel({
        items: 3,
        nav: true,
        margin: 30,
        loop: true,
        dots: false,
        autoplay: false,
        responsiveClass: true,
        dotsClass: 'sj-sliderdots',
        navClass: ['sj-prev', 'sj-next'],
        navContainerClass: 'sj-slidernav',
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: { items: 1, },
          600: { items: 2, },
          992: { items: 3, }
        }
      });
    }
    /*--------------------------------------
        PRETTY PHOTO GALLERY
    --------------------------------------*/
    if ($('#sj-prettyphoto').length > 0) {
      $("a[data-rel]").each(function () {
        $(this).attr("rel", $(this).data("rel"));
      });
      $("a[data-rel^='prettyPhoto']").prettyPhoto({
        animation_speed: 'normal',
        theme: 'dark_square',
        slideshow: 3000,
        autoplay_slideshow: false,
        social_tools: false
      });
    }

    /* -------------------------------------
        THEME ACCORDION
    -------------------------------------- */
    $(function () {
      $('.sj-panelcontent').hide();
      $('.sj-accordion h4:first').addClass('active').next().slideDown('slow');
      $('.sj-accordion h4').on('click', function () {
        if ($(this).next().is(':hidden')) {
          $('.sj-accordion h4').removeClass('active').next().slideUp('slow');
          $(this).toggleClass('active').next().slideDown('slow');
        }
      });
    });

    /* ---------------------------------------
        SEARCH
     -------------------------------------- */
    $(function () {
      $('a[href="#sj-searcharea"]').on('click', function (event) {
        event.preventDefault();
        $('.sj-searcharea').addClass('open');
        $('.sj-searcharea > form > input[type="search"]').focus();
      });
      $('.sj-searcharea, .sj-searcharea button.close').on('click keyup', function (event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
          $(this).removeClass('open');
        }
      });
      $('form').submit(function (event) {
        event.preventDefault();
        return false;
      })
    });
    /*--------------------------------------
        THEME VERTICAL SCROLLBAR
    --------------------------------------*/
    if ($('.sj-verticalscrollbar').length > 0) {
      var _sj_verticalscrollbar = $('.sj-verticalscrollbar');
      _sj_verticalscrollbar.mCustomScrollbar({
        axis: "y",
      });
    }
    if ($('.sj-horizontalthemescrollbar').length > 0) {
      var _sj_horizontalthemescrollbar = $('.sj-horizontalthemescrollbar');
      _sj_horizontalthemescrollbar.mCustomScrollbar({
        axis: "x",
        advanced: { autoExpandHorizontalScroll: true },
      });
    }
    /* -------------------------------------
          SCROLL TO TOP
    -------------------------------------- */
    var _sj_btnscrolltotop = $(".sj-btnscrolltotop");
    _sj_btnscrolltotop.on('click', function () {
      var _scrollUp = $('html, body');
      _scrollUp.animate({ scrollTop: 0 }, 'slow');
    });
    /* -------------------------------------
          OPEN CLOSE
    -------------------------------------- */
    $('.sj-userdropdownbtn').on('click', function (event) {
      var _this = $(this);
      event.preventDefault();
      _this.closest('.sj-categorysinfo').siblings('.sj-categorysinfo').find('.sj-userdropdownmanu').slideUp();
      _this.siblings('.sj-userdropdownmanu').slideToggle();
    });
  });

})(window.jQuery);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function showLoading() {
  (function ($) {
    try {
      $(".preloader-outer").delay(1000).fadeOut();
      $(".loader").delay(500).fadeOut("slow");
    } catch (error) {
      console.log("jQuery error", error);
    }
  })(window.jQuery);
}
