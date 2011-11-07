( function( $ ){
	var locationRx = /^(?:([tlbr])(?::))?([tlbr])?([-+]?\d+)(?:(?::)([tlbr])?([-+]?\d+))?(?:(?::)([tlbr])?([-+]?\d+))?(?:(?::)([tlbr])?([-+]?\d+))?$/i;

	$.Klass.add( 'Cylinder.Item', $.Klass.MVC.View.Mutable, {
		/**
		 * Split a location string into pieces
		 * 0 - Source direction
		 * 
		 * 1 - Offset side       \
		 * 2 - Offset amount      \  These are tied
		 * 3 - Offset side #2     /     together
		 * 4 - Offset amount #2  /
		 * 
		 * 5 - Offset side #3    \
		 * 6 - Offset amount #3   \  These are tied
		 * 7 - Offset side #4     /     together
		 * 8 - Offset amount #4  /
		 * 
		 * 
		 * Examples:
		 * l:r+100       Coming from the left, passing 100px off screen to the right
		 * b:t-100       Coming from the bottom, passing 100px from the top
		 * 100           When passing 100px from left
		 * r-100         When passing 100px from right
		 * 100:200       100-200 px from left
		 * L:L-100:R+100 Coming from the left 100px around the viewport
		 **/
		init : function init( config ){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'parallaxMultiplier', 'xDeg', 'yPos', 'zPos', 'scale', 'speed'
			) );

			this.bindEvents(
				  'set:xDeg'    , 'setTransform'
				, 'set:yPos'    , 'setTransform'
				, 'set:zPos'    , 'setTransform'
				, 'set:scale'   , 'setTransform'
				, 'set:speed'   , 'setTransform'
				, 'dom:moved'   , 'newParent'
				, 'dom:modified', 'newContent'
			);

			this.$content = $( '<div></div>' )
				.css({
					  '-webkit-transform' : 'rotateY(180deg)'
//					, '-webkit-backface-visibility' : 'hidden'
				})
				.appendTo( this.$domNode );
	
			this.$domNode.css({
	            'position' : 'absolute'
			});

			// location handlers
			this.handlers = [];

			this.width = 0;
			this.prevX = 0;
			this.prevY = 0;
		}

		, getContentNode : function getContentNode(){
			return this.$content;
		}

		// Coming from the sphere, sets the x/y rotation
		, setTransform : function setTransform(){
			if( !this.parent ){ return; }

			var r = this.parent.radius;
			this.$domNode.css({
				   '-webkit-transform' : 'rotateY( %sdeg ) translateZ( %spx ) translateY( %spx ) scale( %s )'.sprintf(
						  ( this.xDeg || 0 ) + ( 1 - ( this.parallaxMultiplier || 1 ) ) * ( this.rotation || 0 )
						, Math.sqrt( r*r-this.width*this.width/4 ) * 0.98 + ( this.zPos || 0 )
						, this.yPos || 0
						, this.scale || 1
					)

				// this is here, not above, so that the initial load doesn't move the sprite
				, '-webkit-transition' : '-webkit-transform %ss'.sprintf( this.speed || 0.5 )
			});
		}

		// content changed, re-calculate width
		, newContent : function newContent(){
			this.width = this.$domNode.width();
			this.$domNode.css({ left : -this.width >> 1 });
		}

		// node was moved into another parent (cylinder class)
		, newParent : function newParent( parent ){
			this.parent      = parent;
			this.newContent();

			this.perspective = parent.perspective >> 1;
			this.setTransform();

			this.parent.bind( 'rotate-to', this.bindMethod( 'rotateTo' ) );
		}

		, rotateTo : function rotateTo( deg ){
			this.rotation = deg;
			if( this.parallaxMultiplier ){ this.setTransform(); }

			this.checkTriggers();
		}

		, checkTriggers : function checkTriggers(){
			if( !this.handlers.length ){ return; }

			var deg = this.rotation
			  , i, l, dst;

			while( deg < 0   ){ deg += 360; }
			while( deg > 360 ){ deg -= 360; }

			for( i=0, l=this.handlers.length; i<l; i++ ){
				dst = this.handlers[i].xDeg;
				if( ( Math.abs( deg - dst ) < 20 ) && ( ( this.prevX < dst ) ? 1 : 0 ) !== ( ( deg < dst ) ? 1 : 0 ) ){
					this.handlers[i].handler();
				}
			}

			this.prevX = deg;
		}

		, parseLocStr : function parseLocStr( locStr ){
			if( !locationRx.test( locStr ) ){
				throw new Error( 'Location string ' + locStr + ' does not match pattern, e.g. L:L-100:R-100' );
			}

			var locInfo = locationRx.exec( locStr )
			  ,  compat = {T:1,B:1,L:2,R:2}
			  ,    fill = { 1: ['L','R'], 2: ['T','B'] }
			  ,    grp1 = compat[ locInfo[2] ] || compat[ locInfo[4] ]
			  ,    grp2 = compat[ locInfo[6] ] || compat[ locInfo[8] ];

			if( grp1 && ( compat[ locInfo[2] ] !== compat[ locInfo[4] ] ) ){
				throw new Error( 'Location string ' + locStr + ' 1st & 2nd locations conflict' );
			}

			if( grp2 && ( compat[ locInfo[6] ] !== compat[ locInfo[8] ] ) ){
				throw new Error( 'Location string ' + locStr + ' 3rd & 4th locations conflict' );
			}

			// if 3rd number exists
			if( locInfo[7] ){
				if( !locInfo[9] ){
					throw new Error( 'Location string ' + locStr + ' can not have 3rd location without 4th' );
				}

				if( grp1 === grp2 ){
					throw new Error( 'Location string ' + locStr + ' must have separate axes for 1st/2nd & 3rd/4th locations.' );
				}

				if( !grp1 && grp2 ){
					grp1 = ( grp2 === 1 ) ? 2 : 1;
					locInfo[2] = fill[grp2][0];
					locInfo[4] = fill[grp2][1];
				}else if( grp1 && !grp2 ){
					grp2 = ( grp1 === 1 ) ? 2 : 1;
					locInfo[6] = fill[grp1][0];
					locInfo[8] = fill[grp1][1];
				}
			}

			if( !grp1 ){
				locInfo[2] = 'L';
				if( locInfo[5] ){ locInfo[4] = 'R'; }
			}
			if( grp1 && !locInfo[2] ){ locInfo[2] = locInfo[4] ? ( ( grp1[0] === locInfo[4] ) ? grp1[1] : grp1[0] ) : 'L'; }
			if( grp1 && !locInfo[4] ){ locInfo[4] = ( grp1[0] === locInfo[2] ) ? grp1[1] : grp1[0]; }
			if( grp2 && !locInfo[6] ){ locInfo[6] = ( grp2[0] === locInfo[8] ) ? grp2[1] : grp2[0]; }
			if( grp2 && !locInfo[8] ){ locInfo[8] = ( grp2[0] === locInfo[6] ) ? grp2[1] : grp2[0]; }

			return locInfo;
		}

		// Attach a handler to a location
		, bindLocHandler : function bindLocHandler( locStr, handler, repeat ){
			var locInfo = this.parseLocStr( locStr );

			this.handlers.push( this.configLocInfo( { info: locInfo, handler: handler, repeat: repeat } ) );
		}

		// sets params on a location object based on the size of the current node
		, configLocInfo : function configLocInfo( loc ){
			loc.xDeg = parseFloat( loc.info[3] );

			return loc;
		}

		// Add a handler that fires one time when locStr matches
		, bindLocation : function bindLocation( locStr, handler ){
			return this.bindLocHandler( locStr, handler );
		}

		// Add a handler that fires constantly with positioning info when locStr matches
		, bindLocationRepeater : function bindRange( locStr, handler ){
			return this.bindLocHandler( locStr, handler, true );
		}
	} );
}( jQuery ) );