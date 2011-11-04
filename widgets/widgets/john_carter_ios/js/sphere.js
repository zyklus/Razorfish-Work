( function( $ ){
	$.Klass.add( 'Sphere', $.Klass.View, {
		init : function( config ){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'depth', 'parallaxMultiplier'
			) );
		}
	} );
}( jQuery ) );