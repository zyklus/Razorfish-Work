$( window ).bind( 'load', function(){
	var $scroller = $( '#scroller' )
	  ,     $img1 = $scroller.find( 'img' )
	  ,     $img2 = $img1.clone().appendTo( $scroller )
	  ,  imgWidth = $img1.width()
	  , mouseInfo = false
	  ,   leftPos = 0;
;
	$( document.body )
		.bind( 'mousedown touchstart', mouseDown )
		.bind( 'mouseup touchend'    , mouseUp   )
		.bind( 'mousemove touchmove' , mouseMove );

	function mouseDown( ev ){
		mouseInfo = { pX: ev.pageX, pY: ev.pageY, leftPos: leftPos };
		
		ev.preventDefault();
	}

	function mouseUp( ev ){
		mouseInfo = false;
		ev.preventDefault();
	}

	function mouseMove( ev ){
		ev.preventDefault();
		if( !mouseInfo ){ return; }

		setXPos( leftPos + ev.pageX - mouseInfo.pX );
	}

	function setXPos( pos ){
		while( pos < 0 )        pos += imgWidth;
		while( pos > imgWidth ) pos -= imgWidth;

		$scroller.scrollLeft( leftPos = pos );
	}
});