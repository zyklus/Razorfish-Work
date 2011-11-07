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
			  ,      imgIx = 0
			  ,       imgX = 0
			  , i, l, face, faceWidth;

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
				});

				face.append(
					$( '<div></div>' )
						.css({
							background : "url( '%s' ) %spx 0px".sprintf( this.$images[ imgIx ][0].src, imgX )
							,    width : 0|faceWidth
							,   height : faceHeight
						})
				).appendTo( this );

				imgX += faceWidth;
				if( imgX >= this.$images[ imgIx ][0].width ){
					imgIx++;
					imgX = 0;
				}

				this.faceKlss.push( face );
			}
		}
	} );
}( jQuery ) );