/***********************
 * Reads a config file *
 ***********************/

(function( $ ){
	$.Klass.add( 'File.ConfigReader', $.Klass.File.Dependency, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'lineExpressions' );
		}

		, dataReady : function dataReady(){
			var lines = this.getLines()
			  , i, l;

//			for( i=0, l=
		}
	} );
}( jQuery ));