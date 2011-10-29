/**
 * Simple scrollbar -- styles are NOT included
 **/

(function(){
	function Scroller( $node, config ){
		this.$node  = $node;
		this.config = config || {};
		this.init().check();
	}

	Scroller.prototype = {
		init : function(){
			var self = this;

			this.$scrCont = $( '<div></div>' )
				.appendTo( this.$node.parent() )
				.css     ( {
					position : 'absolute'
					, zIndex : 1
				} );

			this.$scroller = this.$scrCont
				.append( '<div class="scroller"><div class="scrollerTop"></div><div class="scrollerBody"></div><div class="scrollerBottom"></div><div class="scrollerHandle"></div></div>' )
				.find  ( '.scroller' );

			this.$node
				.bind  ( 'mousewheel DOMMouseScroll', function(){
					self.onScroll.apply( self, arguments );
				} ).find( '.scroller' );

			this.$handle = this.$scroller
				.find( '.scrollerHandle' )
					.bind( 'mousedown', function(){
						self.mouseDown.apply( self, arguments );
					} );

			this.mMove = function(){
				self.mouseMove.apply( self, arguments );
			};
			this.mUp = function(){
				self.mouseUp();
			};

			return this;
		}

		, check : function(){
			this.$handle.css( 'top', 0 );

			this.nodeHeight   = this.$node.height();
			this.scrollHeight = this.$node.prop( 'scrollHeight' );

			if( this.nodeHeight >= this.scrollHeight ){
				this.$scroller.hide();
				return;
			}
			this.$scroller.show();

			if( this.scrollHeight > this.nodeHeight ){
				this.$node.addClass( 'scroller-enabled' );
				this.enabled = true;

				this.$scrCont.css({
					     top : this.$node.position().top
					, height : this.$node.height()
					,  right : this.$node.offsetParent().width() - this.$node.position().left - this.$node.width()
				});

			}else{
				this.$node.removeClass( 'scroller-enabled' );
				this.enabled = false;
			}

			this.scrollerHeight = this.$scroller.height();
			this.handleHeight   = this.$handle.height();
			this.barPercent     = ( this.scrollerHeight - this.handleHeight - ( this.config.minTop || 0 ) - ( this.config.minBottom || 0 ) ) / this.scrollerHeight;

			this.percentTop     = ( this.config.minTop || 0 ) / this.scrollerHeight;
			this.minScrPos      = this.scrollerHeight * this.percentTop;
			this.maxScrPos      = this.scrollerHeight * ( this.barPercent + this.percentTop );
			this.scrDistance    = this.maxScrPos - this.minScrPos;

			return this.update();
		}

		, update : function(){
			var scrTop = this.$node.scrollTop()
			  , perTop = scrTop / ( this.nodeHeight - this.scrollHeight ); // how far the content is scrolled

			this.scrPosition = ( 0| -10000 * ( perTop * this.barPercent - this.percentTop ) ) / 100;

			this.$handle.css( 'top', this.scrPosition + '%' );

			return this;
		}

		, mouseDown : function( ev ){
			ev.preventDefault();

			this.downY        = ev.pageY;
			this.mouseDownPos = this.scrPosition;
			this.mouseDownScr = this.$node.prop( 'scrollTop' );

			$( document.body )
				.bind( 'mousemove', this.mMove )
				.bind( 'mouseup'  , this.mUp   );

			return this;
		}

		, mouseMove : function( ev ){
			ev.preventDefault();

			var  deltaMouseY = ev.pageY - this.downY
			  , deltaPercent = deltaMouseY / this.scrDistance;

			this.$node.prop( 'scrollTop', this.mouseDownScr + ( this.scrollHeight - this.nodeHeight ) * deltaPercent );
			this.update();

			return this;
		}

		, mouseUp : function(){
			$( document.body )
				.unbind( 'mousemove', this.mMove )
				.unbind( 'mouseup'  , this.mUp   );
		}

		, onScroll : function( ev ){
			var delta = ev.wheelDelta || (
				$.extend( ev, ev.data ),
				-ev.detail * 2
			);
			this.$node.prop( 'scrollTop', this.$node.prop( 'scrollTop' ) - delta );

			return this.update();
		}
	};


	$.fn.simpleScrollBar = function( fn ){
		return this.each( function(){
			var $this = $( this )
			  , scroller;

			if( 'string' === typeof( fn ) ){
				scroller = $this.data( 'ScrollBar' );
				if( !scroller ){ return; }

				scroller[ fn ]();

			}else{
				$this.data( 'ScrollBar', new Scroller( $( this ), fn ) );
			}
		} );
	};
}());