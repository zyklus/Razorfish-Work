/**********************************
 * Reads an .obj (3d object) file *
 **********************************/

(function( $ ){
	$.Klass.add( 'File.Types.OBJ', $.Klass.File.ConfigReader, {
		init : function init(){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'materialLib' );

			this.materials       = {};
			this.vertices        = [];
			this.textureVertices = [];
			this.faces           = [];
			this.facePlanes      = [];

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
		}

		, useMaterialLib : function useMaterialLib( mtlLib ){
			var mtl;

			mtl = this.materials[ mtlLib ] = new $.Klass.File.Types.MTL({
				// prepend the parent folder of the current .obj file
				file: this.parentFolder() + mtlLib
			});

			mtl.bind( 'ready', this.bindMethod( 'materialReady' ).deferCallback() );
		}

		, materialReady : function materialReady( mtl ){
			var mat;

			// remap the material based on it's given name, not file-name
			if( this.materials[ mtl.name ] && ( this.materials[ mtl.name ] !== mtl ) ){
				throw new Error( 'Two materials named "' + mtl.name + '" exist' );
			}
			this.materials[ mtl.name ] = mtl;

			for( mat in this.materials ){
				if( !this.materials[ mat ].isReady() ){ return; }
			}

			this.trigger( 'ready', this );
		}

		, newVertex : function newVertex( data ){
			var i, l;

			data = data.split( /\s+/ );
			for( i=0, l=data.length; i<l; i++ ){
				data[i] = parseFloat( data[i] );
			}

			this.vertices.push( data );
		}

		, newVertexTexture : function newVertexTexture( data ){
			var i, l;

			data = data.split( /\s+/ );
			for( i=0, l=data.length; i<l; i++ ){
				data[i] = parseFloat( data[i] );
			}

			this.textureVertices.push( data );			
		}

		, newFace : function newFace( data ){
			var i, l, point;

			data = data.split( /\s+/ );
			for( i=0, l=data.length; i<l; i++ ){
				point = data[i].split( '/' );
				data[i] = {};


				// .obj faces are 1-indexed, so subtract 1 from everything
				data[i].vtx  = parseInt( point[0], 10 ) - 1;
				data[i].tVtx = parseInt( point[1], 10 ) - 1;
			}

			this.faces.push( { mtl: this.activeMaterial, points: data } );
		}

		, useMaterial : function useMaterial( data ){
			this.activeMaterial = data;
		}
	} );
}( jQuery ));