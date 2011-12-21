/***********************************
 * Reads a .mtl (3d material) file *
 ***********************************/

(function( $ ){
	$.Klass.add( 'File.Types.MTL', $.Klass.File.ConfigReader, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'name', 'specularExponent', 'diffuseMap', 'diffuseMapNode' );

			this.set( {
				      lineComment : '#'
				, lineExpressions : [
					  [ 'newmtl', 'set:name'             ]
					, [ 'Ns'    , 'set:specularExponent' ]
					, [ 'map_Kd', 'setDiffuseMap'       ]
				]
			} );

			this.bind( 'set:name', this.bindMethod( 'trigger', 'ready', this ), 'set:diffuseMapNode' );
		}

		, isReady : function isReady(){
			return this.get( 'name' ) && this.get( 'diffuseMapNode' );
		}

		, setDiffuseMap : function setDiffuseMap( map ){
			var self = this;

			$.Util.imageLoader( this.parentFolder() + map, function( $img ){
				self.set( 'diffuseMapNode', $img );
			} );
		}
	} );
}( jQuery ));