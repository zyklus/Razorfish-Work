( function( $ ){
	$.Klass.add( 'Sprite.Animation', $.Klass.MVC.View, {
		init : function init(){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'image', 'imgWidth', 'imgHeight', 'frames', 'interval', 'rows', 'cols'
			) );

			this.bindEvents(
				'set:interval', 'restart'
			);

			this.bind( [ 'set:image', 'set:imgWidth', 'set:imgHeight', 'set:frames' ], this.bindMethod( 'reset' ) );

			this.frame = -1;
		}

		, reset : function reset(){
			this.$domNode.css({
				  backgroundImage : "url('" + this.image + "')"
				,           width : this.imgWidth
				,          height : this.imgHeight
			});

			return this.setFrame( 0 );
		}

		, setFrame : function setFrame( frame ){
			while( frame < 0 ){ frame += this.frames; }
			while( frame >= this.frames ){ frame -= this.frames; }

			var row = 0|frame / ( this.cols || 1 )
			  , col =   frame % ( this.cols || 1 );

			this.frame = frame;

			this.$domNode.css({ backgroundPosition : ( -col * this.imgWidth ) + 'px ' + ( -row * this.imgHeight ) + 'px' });

			return this;
		}

		, stop : function stop(){
			if( this.nInterval ){
				clearInterval( this.nInterval );
				this.nInterval = null;
			}

			return this;
		}

		, start : function start(){
			this.nInterval = setInterval( this.bindMethod( 'nextFrame' ), this.interval || 50 );

			return this;
		}

		, restart : function restart(){
			this.stop().setFrame( -1 ).start();
		}

		, prevFrame: function prevFrame(){
			return this.setFrame( --this.frame );
		}

		, nextFrame : function nextFrame(){
			return this.setFrame( ++this.frame );
		}
	});
}( jQuery ));