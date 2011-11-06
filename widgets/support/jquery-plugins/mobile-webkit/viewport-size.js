/**
 * Determines the largest possible viewport size for mobile webkit, fires
 *   events on resize, orientation change
 **/

( function( $ ){
	var       $div = $( '<div></div>' ).css({ position: 'absolute', top: 0, left: 0, width: 3000, height: 3000 }).hide()
	  ,    $window = $( window )
	  , origHeight = window.innerHeight
	  , appended, width, height;

	$( appendDiv );
	$window
		.bind( 'orientationchange', rotate )
		.bind( 'orientationchange', checkSize )
		.bind( 'resize'           , checkSize );

	function appendDiv(){
		if( !document.body ){ setTimeout( appendDiv, 10 ); }

		appended = true;
		$div.appendTo( document.body );
		window.scrollTo( 0, 1 );

		setTimeout( checkSize, 10 );
	}

	function rotate(){
		window.scrollTo( 0, 1 );
	}

	function checkSize(){
		if( !appended ){ return; }

		$div.show();
		var w = window.innerWidth
		  , h = window.innerHeight;

		if( ( w !== width ) || ( h !== height ) ){
			width = w;
			height = h;

			$window.trigger( 'viewportResize', [ w, h ] );
		}

		$div.hide();
	}
}( jQuery ) );