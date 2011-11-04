( function( $ ){
	// interface to the compass that gets normalized
	$.Klass.add( 'HTML5.Orientation', $.Klass.Observable, {
		init : function( config ){
			$( window ).bind( 'deviceorientation', this.bindMethod( 'orientationChange' ) );
		}

		, orientationChange : function( ev ){
			var heading = ev.webkitCompassHeading;
		}
	} );
}( jQuery ) );