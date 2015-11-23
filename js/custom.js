function showslide(el,now) {
	if (now) {
		el.show().delay(7000).fadeOut(300, function() {
		if(el.next().is('article')) showslide(el.next(),false);
		else showslide($('.highlight article').first(),false);
	    });
	}
	else {
		el.delay(300).animate( { height: "toggle" }, 1000, 'swing').delay(7000).fadeOut(300, function() {
		if(el.next().is('article')) showslide(el.next(),false);
		else showslide($('.highlight article').first(),false);
	    });
	}

}
function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        // if cookie exists
        if (offset != -1) { 
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1) end = document.cookie.length;
            returnvalue=unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}
function set_cookie(what){
    document.cookie="splashshown="+what
}


$( document ).ready(function() {
	var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
	if(iOS) $('body').addClass('iOS');
	
	if (get_cookie("splashshown")=="") $('#splash').show();
	set_cookie('true');

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
	
	showslide($('.highlight article').first(),true);
	
	$('a').click(function(){
		el = $.attr(this, 'href').replace('/','');
	    $('html, body').animate({
	        scrollTop: $( el ).offset().top-$( ".navbar-default" ).height()
	    }, 500);
	    return false;
	});

	$('#splash').delay(1500).fadeOut();
    $('#review').css('left', '-'+$('#review').width()+'px');
    $('#review').css('visibility','visible'); 
	$('#review').animate({"left": '+='+$('#review').width()},1500);
});