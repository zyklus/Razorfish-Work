/**********************************
 * Reads an .obj (3d object) file *
 **********************************/

(function( $ ){
	$.Klass.add( 'File.Types.OBJ', $.Klass.File.ConfigReader, {
		init : function init(){
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
			this.materials[ data ] = new $.Klass.FileStyles.MTL({
				// prepend the parent folder of the current .obj file
				file: ( ( /(.*\/)[^\/]+$/.exec( this.file || '' ) || '' )[1] || '' ) + data
			});
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
		}

		, useMaterial : function useMaterial( data ){
			
		}

		, dataReady : function dataReady(){
			this.readConfigData();
		}
	} );
}( jQuery ));