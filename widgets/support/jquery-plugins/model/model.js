/**
 * Quick-and-dirty in-memory model.  Should be extended to store data off
 *   to somewhere (browser data-store, ajax, etc) if necessary
 **/
(function( $ ){
	$.Klass.add( 'Model', $.Klass.Observable, {
		init : function( config ){
			this._super.apply( this, arguments );
		}
	});
})( jQuery );