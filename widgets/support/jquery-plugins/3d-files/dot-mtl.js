/***********************************
 * Reads a .mtl (3d material) file *
 ***********************************/

(function( $ ){
	$.Klass.add( 'FileTypes.MTL', $.Klass.ConfigReader, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'Name', 'specularExponent', 'diffuseMap' );

			this.set( {
				      lineComment : '#'
				, lineExpressions : [
					  [ 'newmtl', 'set:Name'             ]
					, [ 'Ns'    , 'set:specularExponent' ]
					, [ 'map_Kd', 'set:diffuseMap'       ]
				]
			} );

			this.bindEvents( 'set:fileData', 'dataReady' );
		}

		, dataReady : function dataReady(){
			this.readConfigData();
		}
	} );
}( jQuery ));