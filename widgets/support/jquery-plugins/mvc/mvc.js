(function( $ ){
	$.Klass.add( 'MVC', $.Klass.Configurable, {
		init : function(){
			this.supper.apply( this, arguments );

			// add known config options
			this.addConfigParameters( 'controller' );
		}

		, destroy : function(){
			// release stuffs -- BRUTE FORCE FTW!
			var n;
			for( n in this ){
				if( !this.hasOwnProperty( n ) ){ continue; }
				delete this[n];
			}

			// not chainable ;)
		}
	});
}( jQuery ));