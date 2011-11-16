/**********************************
 * Reads an .obj (3d object) file *
 **********************************/

(function( $ ){
	$.Klass.add( 'FileTypes.OBJ', $.Klass.ConfigReader, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'materialLib' );

			this.materials  = {};
			this.vertices   = {};
			this.faces      = {};
			this.facePlanes = {};

			this.set( {
				      lineComment : '#'
				, lineExpressions : [
					  [ 'mtllib', 'useMaterialLib'   ]
					, [ 'v'     , 'newVertex'        ]
					, [ 'vt'    , 'newVertexTexture' ]
					, [ 'f'     , 'newFace'          ]
					, [ 'usemtl', 'useMaterial'      ]
				]
			} );

			this.bindEvents( 'set:fileData', 'dataReady' );
		}

		, useMaterialLib : function useMaterialLib( data ){
			
		}

		, newVertex : function newVertex( data ){
			
		}

		, newVertexTexture : function newVertexTexture( data ){
			
		}

		, newFace : function newFace( data ){
			var points = data.split( ' ' )
			  , i, l;

			for( i=0, l=points.length; i<l; i++ ){
		}

		, useMaterial : function useMaterial( data ){
			
		}

		, dataReady : function dataReady(){
			this.readConfigData();
		}
	} );
}( jQuery ));