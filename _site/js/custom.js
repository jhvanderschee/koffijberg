function showslide(el) {
	el.delay(300).animate( { height: "toggle" }, 1000, 'swing').delay(7000).fadeOut(300, function() {
	if(el.next().is('article')) showslide(el.next());
	else showslide($('.highlight article').first());
	});
}

$( document ).ready(function() {
	var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
	if(iOS) $('body').addClass('iOS');
	
    if(window.location.hash) {
    	var hash = window.location.hash.substring(1);
    	var offset = $('#'+hash).offset();
    	var scrollto = (offset.top-$( ".navbar-default" ).height()); 
		setTimeout(function() {
			window.scrollTo(0, scrollto);
		}, 1);
    }
    $( window ).scroll(function() {
	  if($(window).scrollTop()>(800-$( ".navbar-default" ).height()-1) && !$( ".navbar-default" ).hasClass('attop')) $( ".navbar-default" ).addClass('attop');
	  if($(window).scrollTop()<(800-$( ".navbar-default" ).height()-1) && $( ".navbar-default" ).hasClass('attop')) $( ".navbar-default" ).removeClass('attop');

	  if($(window).scrollTop()) $( ".arrow" ).hide(  );
	  else $( ".arrow" ).show( );
	});
	
	showslide($('.highlight article').first());
	
	$('a').click(function(){
		el = $.attr(this, 'href').replace('/','');
	    $('html, body').animate({
	        scrollTop: $( el ).offset().top-$( ".navbar-default" ).height()
	    }, 500);
	    return false;
	});

	$('#splash').delay(1500).fadeOut();
});