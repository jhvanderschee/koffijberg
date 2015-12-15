function showslide(el,now) {
	if($('body').hasClass('Android') || $('body').hasClass('iOS')) {
		el.fadeIn().delay(7000).hide(0, function() {
		if(el.next().is('article')) showslide(el.next(),false);
		else showslide($('.highlight article').first(),false);
		});
	}
	else {
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
function nextmember() {
		//$('.ch-grid li').css('left','-195px');
		$('.ch-grid').append($('.ch-grid li:first').css({
        opacity: 0,
        display: 'inline-block'     
    }).animate({opacity:1},600));
		//$('ul.ch-grid li').css('left','0');
}
function prevmember() {
		//$('.ch-grid li').css('left','195px');
		$('.ch-grid').prepend($('.ch-grid li:last').hide().fadeIn(2000));
		//$('ul.ch-grid li').css('left','0');
}
function iOSversion(useragent) {
  if (/iP(hone|od|ad|od Touch)/.test(useragent)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
  return false;
}
$(window).on('orientationchange', function(e) {
	window.location.reload();
});

$( document ).ready(function() {
	if($(window).height()<500) {
		$('body').addClass('low_height');
	}

	var useragent = navigator.userAgent;
	//check for old stock Android browser
	//to remove position fixed and background attachment fixed
	if(	(useragent.indexOf("Mozilla/5.0") > -1) &&
		(useragent.indexOf("Android") > -1) &&
		(useragent.indexOf("Chrome") == -1)
	) {
		$('body').addClass('old_Android');
		alert('old_Android');
	}

	//check for Android
	//to remove animation
	if(useragent.indexOf("Android") > -1) $('body').addClass('Android');

	//check for old iOS version 
	//to remove position fixed
	var iOS_version = iOSversion(useragent);
	if(iOS_version[0]<5) $('body').addClass('old_iOS');
	if(iOS_version[0]>6) $('body').addClass('new_iOS');

	//check for iOS 
	//to remove background attachment fixed and animation
	var iOS = /(iPad|iPhone|iPod)/g.test(useragent);
	if(iOS) $('body').addClass('iOS');

	//detect browser with Touch Events running on touch-capable device
	if ('ontouchstart' in window) {
	     $('body').addClass('touch');
	}

	//show splash if modern device/browser
	if(!$('body').hasClass('old_Android') && !$('body').hasClass('old_iOS')) {
		if (get_cookie("splashshown")=="") $('#splash').show();
	}
	set_cookie('true');

    if(window.location.hash) {
    	var hash = window.location.hash.substring(1);
    	if(hash) {
	    	var offset = $('#'+hash).offset();
	    	var scrollto = (offset.top-$( ".navbar-default" ).height()); 
			setTimeout(function() {
				window.scrollTo(0, scrollto);
			}, 1);
		}
    }
    $( window ).scroll(function() {

      if(!$('body').hasClass('old_Android') && !$('body').hasClass('old_iOS')) {
	  	if($(window).scrollTop()>(800-$( ".navbar-default" ).height()-1) && !$( ".navbar-default" ).hasClass('attop')) $( ".navbar-default" ).addClass('attop');
	  	if($(window).scrollTop()<(800-$( ".navbar-default" ).height()-1) && $( ".navbar-default" ).hasClass('attop')) $( ".navbar-default" ).removeClass('attop');
	  }

	  if($(window).scrollTop()) $( ".arrow" ).hide(  );
	  else if(!$('body').hasClass('touch')) $( ".arrow" ).show( );
	});
	
	showslide($('.highlight article').first(),true);
	
	$('a').click(function(){
		if($('body').hasClass('home')) {
			el = $.attr(this, 'href').replace('/','');
			if(el!='#') {
			    $('html, body').animate({
			        scrollTop: $( el ).offset().top-$( ".navbar-default" ).height()
			    }, 500);
			    return false;
			}
		}
	});
	

	if($('body').hasClass('Android') || $('body').hasClass('iOS')) {
		//no animation
		$('#splash').delay(1500).hide();
		$('#review').css('visibility','visible'); 
	}
	else {
		//animation
		$('#splash').delay(1500).fadeOut();
	    $('#review').css('left', '-'+$('#review').width()+'px');
    	$('#review').css('visibility','visible'); 
		$('#review').animate({"left": '+='+$('#review').width()},1500);
	}
	var rand = Math.floor((Math.random() * 3) + 1);
	if(rand==1) $('.intro').addClass('dames');
	if(rand==2) $('.intro').addClass('heren');
	if(rand==3) $('.intro').addClass('koffijberg');

});