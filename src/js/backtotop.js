$(document).ready(function(){
	$("a").click(function () {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top - 200;
    $('html, body').animate({ scrollTop: destination }, 1000);
    return false;
  });

	$(function() {
		$(".watermark").watermark({
			path: '../images/watermark.png'
		});
	});
});
