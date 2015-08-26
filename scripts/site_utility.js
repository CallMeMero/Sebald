$(document).ready(function() {
  $(window).scroll(function() {
    var height = $('.header').outerHeight(true);
    var width = $('.header').outerWidth(true);
    if ($(window).width() > 991 ) {
      if($(window).scrollTop() > height) {
        $('.navbar').css('position', 'fixed');
        $('.navbar').css('top', '0');
        $('.navbar').css('z-index', '1000');
        $('.navbar').css('width', width);
        $('.content').css('margin-top', $('.navbar').outerHeight(true));
      }else {
        $('.navbar').removeAttr('style');
        $('.content').removeAttr('style');
      }
    }else {
      $('.navbar').removeAttr('style');
      $('.content').removeAttr('style');
    }
  });

  // Get min height of content div
  var min_height = $(window).height() - $('.header').outerHeight(true) - $('.navbar').outerHeight(true) - ($('.content').outerHeight(true) - $('.content').outerHeight());
  $('.content').css('min-height', min_height);
});
