( function( $ ){
	$.Klass.add( 'Sphere.Item', $.Klass.View.Mutatable, {
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
		 * 
		 **/
		     locationRx : /^(?:([tlbr])(?::))?([tlbr])?([-+]?\d+)(?:(?::)([tlbr])?([-+]?\d+))?(?:(?::)([tlbr])?([-+]?\d+))?(?:(?::)([tlbr])?([-+]?\d+))?$/i
		, conflictLocRx : /(?=[tb])(?=[rl])/i

		, init : function( config ){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'parallaxMultiplier', 'xPos', 'yPos'
			) );
		}

		// Coming from the sphere, sets the x/y rotation
		, setDegrees : function setDegrees( degX, degY ){
			
		}

		, validateLocStr : function( locStr ){
			if( !this.locationRx.test( locStr ) ){
				throw new Error( 'Location string ' + locStr + ' does not match pattern, e.g. L:L-100:R-100' );
			}
			if( this.conflictLocRx.test( locStr ) ){
				throw new Error( 'Location string ' + locStr + ' may not have both horizontal ( l/r ) and vertical ( t/b ) values.' )
			}
		}

		// Attach a handler to a location
		, bindLocHandler( locStr, handler, repeat ){
			this.validateLocStr( locStr );

			var locInfo = this.locationRx.exec( locStr );
			this.handlers.push(
		}

		// Add a handler that fires one time when locStr matches
		, bindLocation : function bindLocation( locStr, handler ){
			return this.bindLocHandler( locStr, handler );
		}

		// Add a handler that fires constantly with positioning info when locStr matches
		, bindLocationRepeater : function bindRange( locStr, handler ){
			return this.bindLocHandler( locStr, handler, true );
		}

		// Add jQuery methods that allow manipulation of content
		, append : function( node ){ return this.runjQCmd( 'append', node ); }
	} );
}( jQuery ) );