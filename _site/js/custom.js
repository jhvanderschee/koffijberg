function showslide(el) {
	el.delay(300).animate( { height: "toggle" }, 1000, 'swing').delay(7000).fadeOut(300, function() {
	if(el.next().is('article')) showslide(el.next());
	else showslide($('.highlight article').first());
	});
}

$( document ).ready(function() {
    $( window ).scroll(function() {
	  if($(window).scrollTop()) $( ".arrow" ).hide(  );
	  else $( ".arrow" ).show( );
	});
	
	showslide($('.highlight article').first());
	
	$('a').click(function(){
		el = $.attr(this, 'href').replace('/','');
	    $('html, body').animate({
	        scrollTop: $( el ).offset().top
	    }, 500);
	    return false;
	});
});