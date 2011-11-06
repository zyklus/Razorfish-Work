( function( $ ){
	$.Klass.add( 'Cylinder', $.Klass.MVC.View, {
		init : function( config ){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'perspective', 'parallaxMultiplier', 'radius'
			) );

			this.$domNode
				.css({
					                       'width' : '100%'
					,                     'height' : '100%'
					,                   'position' : 'absolute'
					,                       'left' : 0
					,                      'right' : 0
					, '-webkit-perspective-origin' : '50% 50%'
				});

			this.$cylinder = $( '<div></div>' )
				.css({
					                      width : '100%'
					,                    height : '100%'
					, '-webkit-transform-style' : 'preserve-3d' 
				})
				.appendTo( this.$domNode );

			this.$container = $( '<div></div>' )
				.css({
					 '-webkit-transform-style': 'preserve-3d'
					,                'margin' : '0 auto'
					,                 'width' : 0
					,    '-webkit-transition' : '-webkit-transform .5s'
					
				})
				.appendTo( this.$cylinder );

			this.bindEvents(
				'set:perspective', 'onSetPerspective'
				,    'set:radius', 'onSetRadius'
			);

			this.degrees = 0;
		}

		// private -- do not call
		, onSetPerspective : function( p ){
			return this.$domNode .css( '-webkit-perspective', '' + p );
		}

		// private -- do not call
		, onSetRadius : function( r ){
			return this.$cylinder.css( '-webkit-transform', 'translateZ(' + r + 'px)' );
		}

		, rotateBy : function rotateBy( deg ){
			return (
				this
					.rotateTo( this.degrees + deg )
					.trigger( 'rotate-by', deg )
			);
		}

		, rotateTo : function rotateTo( deg ){
			this.$container.css({
				'-webkit-transform' : 'rotateY( ' + ( this.degrees = deg ) + 'deg )'
			});

			return this.trigger( 'rotate-to', this.degrees );
		}

		, getContentNode : function(){
			return this.$container;
		}
	} );
}( jQuery ) );