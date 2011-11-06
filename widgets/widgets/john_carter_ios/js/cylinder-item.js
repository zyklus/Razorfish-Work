( function( $ ){
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
		locationRx : /^(?:([tlbr])(?::))?([tlbr])?([-+]?\d+)(?:(?::)([tlbr])?([-+]?\d+))?(?:(?::)([tlbr])?([-+]?\d+))?(?:(?::)([tlbr])?([-+]?\d+))?$/i

		, init : function init( config ){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'parallaxMultiplier', 'xDeg', 'yPos'
			) );

			this.bindEvents(
				  'set:xDeg'    , 'setTransform'
				, 'set:yPos'    , 'setTransform'
				, 'dom:moved'   , 'newParent'
				, 'dom:modified', 'newContent'
			);

			this.$content = $( '<div></div>' )
				.css({
					  '-webkit-transform' : 'rotateY(180deg)'
					, '-webkit-backface-visibility' : 'hidden'
				})
				.appendTo( this.$domNode );
	
			this.$domNode.css({
	            'position' : 'absolute'
			});

			this.width = 0;
		}

		, getContentNode : function getContentNode(){
			return this.$content;
		}

		// Coming from the sphere, sets the x/y rotation
		, setTransform : function setTransform(){
			if( !this.parent ){ return; }

			var r = this.parent.radius;
			this.$domNode.css({
				   '-webkit-transform' : 'rotateY( %sdeg ) translateZ( %spx ) translateY( %spx )'.sprintf(
						  this.xDeg || 0
						, Math.sqrt( r*r-this.width*this.width/4 ) * 0.98
						, this.yPos || 0
					)

				// this is here, not above, so that the initial load doesn't move the sprite
				, '-webkit-transition' : '-webkit-transform .5s'
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
		}

		, parseLocStr : function parseLocStr( locStr ){
			if( !this.locationRx.test( locStr ) ){
				throw new Error( 'Location string ' + locStr + ' does not match pattern, e.g. L:L-100:R-100' );
			}

			var locInfo = this.locationRx.exec( locStr )
			  ,  compat = {T:1,B:1,L:2,R:2}
			  ,    fill = { 1: ['L','R'], 2: ['T','B'] }
			  ,    grp1 = compat[ locInfo[1] ] || compat[ locInfo[3] ]
			  ,    grp2 = compat[ locInfo[5] ] || compat[ locInfo[7] ];

			if( grp1 && ( compat[ locInfo[1] ] !== compat[ locInfo[3] ] ) ){
				throw new Error( 'Location string ' + locStr + ' 1st & 2nd locations conflict' );
			}

			if( grp2 && ( compat[ locInfo[5] ] !== compat[ locInfo[7] ] ) ){
				throw new Error( 'Location string ' + locStr + ' 3rd & 4th locations conflict' );
			}

			// if 3rd number exists
			if( locInfo[6] ){
				if( !locInfo[8] ){
					throw new Error( 'Location string ' + locStr + ' can not have 3rd location without 4th' );
				}

				if( grp1 === grp2 ){
					throw new Error( 'Location string ' + locStr + ' must have separate axes for 1st/2nd & 3rd/4th locations.' );
				}

				if( !grp1 && grp2 ){
					grp1 = ( grp2 === 1 ) ? 2 : 1;
					locInfo[1] = fill[grp2][0];
					locInfo[3] = fill[grp2][1];
				}else if( grp1 && !grp2 ){
					grp2 = ( grp1 === 1 ) ? 2 : 1;
					locInfo[5] = fill[grp1][0];
					locInfo[7] = fill[grp1][1];
				}
			}

			if( !grp1 ){
				locInfo[1] = 'L';
				if( locInfo[4] ){ locInfo[3] = 'R'; }
			}
			if( !locInfo[1] ){ locInfo[1] = locInfo[3] ? ( ( grp1[0] === locInfo[3] ) ? grp1[1] : grp1[0] ) : 'L'; }
			if( !locInfo[3] ){ locInfo[3] = ( grp1[0] === locInfo[1] ) ? grp1[1] : grp1[0]; }
			if( !locInfo[5] ){ locInfo[5] = ( grp2[0] === locInfo[7] ) ? grp2[1] : grp2[0]; }
			if( !locInfo[7] ){ locInfo[7] = ( grp2[0] === locInfo[5] ) ? grp2[1] : grp2[0]; }

			return locInfo;
		}

		// Attach a handler to a location
		, bindLocHandler : function bindLocHandler( locStr, handler, repeat ){
			var locInfo = this.parseLocStr( locStr );

			this.handlers.push( this.configLocInfo( { info: locInfo } ), handler, repeat );
		}

		// sets params on a location object based on the size of the current node
		, configLocInfo : function configLocInfo( loc ){
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