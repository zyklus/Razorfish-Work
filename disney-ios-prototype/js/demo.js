$( window ).bind( 'load', function(){
	var $scroller = $( '#scroller' )
	  ,  $wrapper = $( '#wrapper' )
	  ,     $body = $( document.body )
	  ,     $img1 = $scroller.find( 'img' )
	  ,     $img2 = $img1.clone().appendTo( $scroller )
	  ,  imgWidth = $img1.width()
	  , mouseInfo = false
	  ,   leftPos = 0
	  ,  lastLeft = 0;

	// prevent slight gap between the two images when tilted (remove if tilt is removed)
	$img2.css({ position : 'relative', left : -1 })

	$body
		.bind( 'mousedown touchstart', mouseDown )
		.bind( 'mouseup touchend'    , mouseUp   )
		.bind( 'mousemove touchmove' , mouseMove )

	$wrapper.css ( 'webkitTransition', 'all 0.3s ease-in-out' );
	onRotate();

	function onRotate(){
		$wrapper.css( '-webkit-transform-origin', ( $wrapper.width() >> 1 ) + 'px ' + ( $wrapper.height() >> 1 ) + 'px' );
	}

	function mouseDown( ev ){
		mouseInfo = { pX: ev.pageX, pY: ev.pageY, leftPos: leftPos };
		
		ev.preventDefault();
	}

	function mouseUp( ev ){
		mouseInfo = false;
		ev.preventDefault();

		leftPos = lastLeft;
	}

	function mouseMove( ev ){
		ev.preventDefault();
		if( !mouseInfo ){ return; }

		setXPos( leftPos + ev.pageX - mouseInfo.pX );
	}

	window.addEventListener( 'deviceorientation', function( ev ){
		var heading = ev.webkitCompassHeading;
		if( !heading ){ return; }

		setXPos( heading / 360 * imgWidth );
	} );

	window.addEventListener( 'deviceorientation', function( ev ) {
//		$wrapper.css( 'webkitTransform', 'rotate(' + -ev.gamma + 'deg)' );
	} );

	function setXPos( pos ){
		while( pos < -imgWidth ) pos += imgWidth;
		while( pos > 0         ) pos -= imgWidth;

		pos = pos;

		$scroller.css({ left: lastLeft = pos });
	}
});