/***********************
 * Reads a config file *
 ***********************/

(function( $ ){
	$.Klass.add( 'File.ConfigReader', $.Klass.File.Dependency, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'lineExpressions' );
		}

		, readConfigData : function readConfigData(){
			var lines = this.getLines()
			  , i, l;
console.log( this.lineExpressions );
//			for( i=0, l=
		}
	} );
}( jQuery ));