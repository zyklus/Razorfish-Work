( function( $ ){
	$.Klass.add( 'Cylinder.Background', $.Klass.Cylinder, {
		init : function init(){
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				// allow specification of exact view & model to use
				'image', 'faces'
			) );

			this.bindEvents(
				  'set:image', 'setImage'
				, 'set:faces', 'build'
			);
		}

		, setImage : function setImage( src ){
			$.Util.imageLoader( src, this.bindMethod( 'imageLoaded' ) );
		}

		, imageLoaded : function imageLoaded( $node ){
			this.$image = $node;
			this.build();
		}

		, removeFaces : function removeFaces(){
			var i, l;

			if( this.faceKlss ){
				for( i=0, l=this.faceKlss.length; i<l; i++ ){
					this.faceKlss[i].destroy();
				}
			}
		}

		, build : function build(){
			if( !this.$image || !this.faces ){ return; }

			var   imgWidth = this.$image[0].width
			  ,  faceWidth = imgWidth / this.faces
			  , faceHeight = this.$image[0].height
			  , i, l, face;

			this.set({ 'radius': imgWidth / Math.PI / 2 });

			this.removeFaces();
			this.faceKlss = [];

			for( i=0, l=this.faces; i<l; i++ ){
				face = new $.Klass.Cylinder.Item({
					xDeg : 360 / this.faces * i
				});

				face.append(
					$( '<div></div>' )
						.css({
							background : "url( '%s' ) %spx 0px".sprintf( this.image, i * faceWidth )
							,    width : 0|faceWidth
							,   height : faceHeight
						})
				).appendTo( this );

				this.faceKlss.push( face );
			}
		}
	} );
}( jQuery ) );