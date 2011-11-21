( function( $ ){
	$.Klass.add( 'Cylinder.Background', $.Klass.Cylinder, {
		init : function init(){
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				// allow specification of exact view & model to use
				'images', 'faces'
			) );

			this.bindEvents(
				  'set:images', 'setImages'
				, 'set:faces', 'build'
			);
		}

		, setImages : function setImage( imgs ){
			var loading = 0
			  ,    self = this
			  , i, l;

			this.$images = [];

			for( i=0, l=imgs.length; i<l; i++ ){
				$.Util.imageLoader( imgs[i], ( function( i ){
					return function( $img ){
						self.$images[i] = $img;
						if( --loading ){ return; }

						self.build();
					};
				} ( i ) ) );

				loading++;
			}
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
			if( !this.$images || !this.$images.length || !this.faces ){ return; }

			var   imgWidth = 0
			  , faceHeight = this.$images[0][0].height
			  ,      imgIx = this.$images.length - 1
			  ,       imgX = 0
			  , i, l, face, faceWidth, canvas, ctx;

			for( i=0, l=this.$images.length; i<l; i++ ){
				imgWidth += this.$images[i][0].width;
			}

			faceWidth = imgWidth / this.faces;

			this.set({ 'radius': imgWidth / Math.PI / 2 });

			this.removeFaces();
			this.faceKlss = [];

			for( i=0, l=this.faces; i<l; i++ ){
				face = new $.Klass.Cylinder.Item({
					    xDeg : 360 / this.faces * i
					, xPatch : i ? 0 : ( -360 / this.faces / 2 )
				});

				canvas = $( '<canvas width="%s" height="%s"></canvas>'.sprintf( 0|faceWidth + 0.99, 0|faceHeight ) );
				ctx    = canvas[0].getContext( '2d' );

				// drawImage( image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight )
				ctx.drawImage(
					  this.$images[ imgIx ][0]
					, imgX ? this.$images[ imgIx ][0].width - imgX : 0
					, 0
					, 0|faceWidth + 0.99
					, faceHeight
					, 0
					, 0
					, 0|faceWidth
					, faceHeight
				);

				face.append( canvas ).appendTo( this );

				imgX += faceWidth;
				// .1 is for floating point errors
				if( ( imgX + 0.1 ) >= this.$images[ imgIx ][0].width ){
					imgX = 0;
				}

				if( imgX === faceWidth ){
					imgIx++;
					if( imgIx === this.$images.length ){
						imgIx = 0;
					}
				}

				this.faceKlss.push( face );
			}
		}
	} );
}( jQuery ) );