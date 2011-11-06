(function( $ ){
	$.Klass.add( '3DModel', $.Klass.MVC, {
		init : function init( config ){
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				// allow specification of exact view & model to use
				'faces', 'textures', 'face-texture-map'
			) );

			this.$domNode = $( '<div class="view-' + this.klassName + '"></div>' );

			this.bindEvents(
				  'set:faces'      , 'setFaces'
				, 'set:textures'   , 'setTextures'
				, 'set:texture-map', 'setTextureMap'
			);
		}

		, deferReset : function deferReset(){
			if( this.resetTimer ){
				clearTimeout( this.resetTimer );
				this.resetTimer = null;
			}

			this.resetTimer = setTimeout( this.bindMethod( 'reset' ), 1 );
		}

		, reset : function reset(){
			this.resetTimer = null;

//			this.
		}
	});
}( jQuery ));