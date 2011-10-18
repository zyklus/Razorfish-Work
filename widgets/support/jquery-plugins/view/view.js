(function( $ ){
	$.Klass.add( 'View', $.Klass.Observable, {
		init : function( config ){
			this._super.apply( this, config );
		}
	});
})( jQuery );