(function( $ ){
	$.Klass.add( 'MVC', $.Klass.Observable, {
		init : function( config ){
			this._super();

			for( var n in config ){
				this[ n ] = config[ n ] ;
			}
		}
	});
})( jQuery );