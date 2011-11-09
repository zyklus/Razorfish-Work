(function( $ ){
	$.Klass.add( 'Model3D', $.Klass.MVC.View, {
		init : function init( config ){
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				// allow specification of exact view & model to use
				'vertices', 'textures', 'faceTextureMap'
			) );

			this.$domNode.css({
				                 'position' : 'absolute'
				, '-webkit-transform-style' : 'preserve-3d'
				,       '-webkit-transform' : 'rotateY( 0deg ) rotateX( 0deg ) rotateZ( 0deg )'
			});

			this.bindEvents(
				  'set:vertices'      , 'onSetVertices'
				, 'set:textures'      , 'onSetTextures'
				, 'set:faceTextureMap', 'resetTextures'
			);

			this.rotX = this.rotY = this.rotZ = this.posX = this.posY = this.posZ = 0;
		}

		, onSetVertices : function onSetVertices( vertices ){
			this.parseVertices( vertices );
			return this.resetTextures();
		}

		, onSetTextures : function onSetTextures( textures ){
			return this.resetTextures();
		}

		, parseVertices : function parseVertices( vertices ){
			var i, l;

			this.$faces = [];

			for( i=0, l=vertices.length; i<l; i+=12 ){
				this.addFace( vertices.slice( i, i+12 ), i/12 );
			}

			return this;
		}

		, addFace : function addFace( points, ix ){
			var     mult = 100
			  , radToDeg = 180 / Math.PI
			  , p1, p2, p3, p4
			  , width, height
			  , rotX, rotY, rotZ
			  , x, y, z;

			if( 12 === points.length ){
				p1 = points.slice( 0, 3 );
				p2 = points.slice( 3, 6 );
				p3 = points.slice( 6, 9 );
				p4 = points.slice( 9, 12 );
			}else if( 4 === points.length ){
				p1 = points[0];
				p2 = points[0];
				p3 = points[0];
				p4 = points[0];
			}else{
				throw new Error( 'Invalid vertices' );
			}

			if( ( 3 != p1.length ) || ( 3 != p2.length ) || ( 3 != p3.length ) || ( 3 != p4.length ) ){
				throw new Error( 'Invalid vertices' );
			}

			// normalize to assume p1 is at 0,0,0
			x = p3[0] - p1[0];
			y = p3[1] - p1[1];
			z = p3[2] - p1[2];

			rotX = Math.atan2( x, z );
			if (z >= 0) {
				rotY = -Math.atan2( x * Math.cos( rotX ),  z );
			}else{
				rotY =  Math.atan2( x * Math.cos( rotX ), -z );
			}
			rotZ = Math.atan2( Math.cos( rotX ), Math.sin( rotX ) * Math.sin( rotY ) );

			console.log( x, y, z, rotX, rotY, rotZ );

			this.$faces.push(
				$( '<div></div>' )
					.css({
						                  'position' : 'absolute'
						,                      'top' : 0
						,                     'left' : 0
						,                    'width' : mult*this.distanceBetween( p1, p2 )
						,                   'height' : mult*this.distanceBetween( p2, p3 )
						,        '-webkit-transform' : 'rotateX( %sdeg ) rotateY( %sdeg ) rotateZ( %sdeg ) translateX( %spx ) translateY( %spx ) translateZ( %spx )'
							.sprintf( rotX*radToDeg, rotY*radToDeg, rotZ*radToDeg, mult*p1[0], mult*p1[2], mult*p1[1] )
						, '-webkit-transform-origin' : '0% 0%'
						,          'background-size' : '100% 100%'
					})
					.appendTo( this.$domNode )
			);
		}

		, distanceBetween : function distanceBetween( p1, p2 ){
			var l1 = p2[0] - p1[0]
			  , l2 = p2[1] - p1[1]
			  , l3 = p2[2] - p1[2];

			return Math.sqrt( l1*l1 + l2*l2 + l3*l3 );
		}

		, resetTextures : function resetTextures(){
			var   $faces = this.$faces
			  , textures = this.textures
			  ,      map = this.faceTextureMap
			  , i, l, face;

			if( !$faces || !$faces.length || !textures || !map ){ return this; }

			for( i=0, l=map.length; i<l; i+=2 ){
				face = this.$faces[i>>1];
				if( !face ){ continue; }

				face.css({ 'background-image' : "url( '%s' )".sprintf( textures[ map[ i+1 ] ] ) });
			}

			return this;
		}

		, setTransform : function setTransform(){
			this.$domNode.css({
				'-webkit-transform' : 'rotateX( %sdeg ) rotateY( %sdeg ) rotateZ( %sdeg ) translateX( %spx ) translateY( %spx ) translateZ( %spx )'.sprintf(
					this.rotX, this.rotY, this.rotZ, this.posX, this.posY, this.posZ
				)
			});

			return this;
		}

		, rotateTo : function rotateTo( x, y, z ){
			if( null != x ){ this.rotX = x; }
			if( null != y ){ this.rotY = y; }
			if( null != z ){ this.rotZ = z; }

			return this.setTransform();
		}

		, moveTo : function moveTo( x, y, z ){
			if( null != x ){ this.posX = x; }
			if( null != y ){ this.posY = y; }
			if( null != z ){ this.posZ = z; }

			return this.setTransform();
		}

		, rotateBy : function rotateBy( x, y, z ){
			if( null != x ){ this.rotX += x; }
			if( null != y ){ this.rotY += y; }
			if( null != z ){ this.rotZ += z; }

			return this.setTransform();			
		}

		, moveBy : function moveBy( x, y, z ){
			if( null != x ){ this.posX += x; }
			if( null != y ){ this.posY += y; }
			if( null != z ){ this.posZ += z; }

			return this.setTransform();			
		}

		, rotateXTo : function rotateXTo( x ){ return this.rotateTo( x             ); }
		, rotateYTo : function rotateYTo( y ){ return this.rotateTo( null, y       ); }
		, rotateZTo : function rotateZTo( z ){ return this.rotateTo( null, null, z ); }

		, rotateXBy : function rotateXBy( x ){ return this.rotateBy( x             ); }
		, rotateYBy : function rotateYBy( y ){ return this.rotateBy( null, y       ); }
		, rotateZBy : function rotateZBy( z ){ return this.rotateBy( null, null, z ); }

		, moveXTo : function moveXTo( x ){ return this.moveTo( x             ); }
		, moveYTo : function moveYTo( y ){ return this.moveTo( null, y       ); }
		, moveZTo : function moveZTo( z ){ return this.moveTo( null, null, z ); }

		, moveXBy : function moveXBy( x ){ return this.moveBy( x             ); }
		, moveYBy : function moveYBy( y ){ return this.moveBy( null, y       ); }
		, moveZBy : function moveZBy( z ){ return this.moveBy( null, null, z ); }
	});
}( jQuery ));