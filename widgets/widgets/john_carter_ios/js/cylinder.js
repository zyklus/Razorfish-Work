( function( $ ){
	$.Klass.add( 'Cylinder', $.Klass.MVC.View.Mutable, {
		init : function( config ){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'perspective', 'parallaxMultiplier', 'radius', 'scale'
			) );

			this.$domNode
				.css({
					                       'width' : '100%'
					,                     'height' : '100%'
					,                   'position' : 'absolute'
					,                       'left' : 0
					,                      'right' : 0
					, '-webkit-perspective-origin' : '50% 50%'
					,         '-webkit-transition' : 'scale .5s'
				});

			this.$cylinder = $( '<div></div>' )
				.css({
					                    'width' : '100%'
					,                  'height' : '100%'
					, '-webkit-transform-style' : 'preserve-3d' 
				})
				.appendTo( this.$domNode );

			this.$container = $( '<div></div>' )
				.css({
					 '-webkit-transform-style': 'preserve-3d'
					,                'margin' : '0 auto'
					,                 'width' : 0
					,    '-webkit-transition' : '-webkit-transform .2s linear'
					
				})
				.appendTo( this.$cylinder );

			this.bindEvents(
				'set:perspective', 'onSetPerspective'
				,    'set:radius', 'onSetRadius'
				,     'set:scale', 'onSetScale'
				,  'dom:modified', 'fixFirstItem'
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

		, fixFirstItem : function fixFirstItem(){
			if( this.firstItemTimeout ){ clearTimeout( this.firstItemTimeout ); }
			this.firstItemTimeout = setTimeout( this.bindMethod( 'fixFirstItemCall' ), 1 );
		}

		, fixFirstItemCall : function fixFirstItemCall(){
			var $item = this.$domNode.find( '.view-Cylinder-Item:first' ), $parent = $item.parent();
			$item.prependTo( $parent );
		}

		, rotateBy : function rotateBy( deg ){
			return (
				this
					.rotateTo( this.degrees + deg )
					.trigger( 'rotate-by', deg )
			);
		}

		, onSetScale : function( s ){
			this.$domNode.css({ '-webkit-transform': 'scale( ' + s + ' )' });
		}

		, setTransform : function setTransform(){
			this.$container.css({
				'-webkit-transform' : 'rotateY( %sdeg ) translateY( %spx )'.sprintf( this.degrees, this.topOffset || 0 )
			});

			return this;
		}

		, rotateTo : function rotateTo( deg ){
			this.degrees = deg;
			this.setTransform();

			return this.trigger( 'rotate-to', this.degrees );
		}

		, panTo : function panTo( offset ){
			this.topOffset = offset;
			return this.setTransform();
		}

		, getContentNode : function(){
			return this.$container;
		}
	} );
}( jQuery ) );