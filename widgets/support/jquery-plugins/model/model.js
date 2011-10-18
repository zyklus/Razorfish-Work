(function( $ ){
	$.Klass.add( 'Model', $.Klass.Observable, {
		init : function( config ){
			this._super.apply( this, config );
		}
	});
})( jQuery );