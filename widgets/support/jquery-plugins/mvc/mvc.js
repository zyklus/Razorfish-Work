(function( $ ){
	$.Klass.add( 'MVC', $.Klass.Configurable, {
		init : function init(){
			this._super.apply( this, arguments );

			// add known config options
			this.addConfigParameters( 'controller' );
		}

		, destroy : function destroy(){
			// release stuffs -- BRUTE FORCE FTW!
			var n;
			for( n in this ){
				if( !this.hasOwnProperty( n ) ){ continue; }
				delete this[n];
			}

			return this;
		}
	});
}( jQuery ));