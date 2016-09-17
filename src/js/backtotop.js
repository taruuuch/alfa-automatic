$(document).ready(function(){
	$(window).scroll(function(){
    if ($(this).scrollTop()) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }
	});

	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},1000);
		return false;
	});

	$("a").click(function () {
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top - 200;
      $('html, body').animate({ scrollTop: destination }, 1000);
      return false;
    });
});
