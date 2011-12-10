( function( $ ){
	$.fn.alphaJpeg = function(){
		return this.each( function(){
			var     $this = $( this )
			  , converted = $this.data( 'converted' )
			  ,       src = $this.attr( 'src' )
			  ,  alphaSrc = $this.attr( 'alpha-src' )
			  , convertTo = src + '-' + alphaSrc;

			if( converted === convertTo ){ return this; }

			var   $srcImg = $( '<img />' ).attr( 'src', src )
			  , $alphaImg = $( '<img />' ).attr( 'src', alphaSrc )
			  ,    srcImg = $srcImg[0]
			  ,  alphaImg = $alphaImg[0]
			  ,    toLoad = 2;
			
			$srcImg.add( $alphaImg )
				.bind( 'load', function(){
					var $this = $( this );
					if( $this.data( 'loaded' ) ){ return; }
					$this.data( 'loaded', true );

					if( !--toLoad ){
						draw();
					}
				} )
				.each( function(){
					if( this.height ){
						$( this ).trigger( 'load' );
					}
				} );

			function draw(){
				var $canvas = $( '<canvas width="' + srcImg.width + '" height="' + srcImg.height + '"></canvas>')
				  , ctx;

				$canvas.attr( 'id'   , $this.attr( 'id' ) );
				$canvas.attr( 'class', $this.attr( 'class' ) );

				if( typeof FlashCanvas !== 'undefined' ){
					FlashCanvas.initElement( $canvas[0] );
				}

				ctx = $canvas[0].getContext( '2d' );

				ctx.drawImage( srcImg  , 0, 0, srcImg.width, srcImg.height );
				ctx.globalCompositeOperation = 'xor';
				ctx.drawImage( alphaImg, 0, 0, srcImg.width, srcImg.height );

				$this.replaceWith( $canvas );
			}
		} );
	};
}( jQuery ) );