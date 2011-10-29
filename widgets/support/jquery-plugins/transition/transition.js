(function(){
	$.transitionEffects = {};

	$.fn.transitionTo = function( target, effect, duration, easing, cb ){
		// doesn't make sense to run this on multiple elements, get the first
		var $source = this.eq(0)
		  , $target = $( target )
		  ,    sPos = $source.css( 'position' )
		  ,     sZi = $source.css( 'zIndex' )
		  , sPosObj = $source.position()
		  ,   $cont = $( '<div></div>' )
		  , $parent = $source.parent()
		  ,   $next = $source.next()
		  ,   width = $source.width()

		// store current CSS values so we can reset them
		  ,     oPP = $parent.css( 'position' )
		  ,     oSP = $source.css( 'position' )
		  ,     oSL = $source.css( 'left'     )
		  ,     oST = $source.css( 'top'      )
		  ,     oSZ = $source.css( 'zIndex'   )
		  ,     oSW = $source.css( 'width'    )
		  ,     oTP = $target.css( 'position' )
		  ,     oTL = $target.css( 'left'     )
		  ,     oTT = $target.css( 'top'      )
		  ,     oTZ = $target.css( 'zIndex'   )
		  ,     sZI = parseInt( oSZ ) || 1;

		// in case the next sibling is already the target
		while( ( $source[0] === $next[0] ) || ( $target[0] === $next[0] ) ){
			$next = $next.next();
		}

		/**
		 * - put a container node in place of the source node
		 *   - overflow hidden
		 * - append source node at left:0, top:0
		 * - append target node after source node
		 * - hide target node
		 * - raise target zIndex
		 * - call effect
		 *   - callback
		 *     - hide source node
		 *     - reset source css
		 *     - reset target css to source css
		 *     - remove container
		 *     - place target in place of container
		 **/

		if( 'static' === oPP ){
			$parent.css({ position : 'relative' });
		}

		if( $next.length ){
			$cont.insertBefore( $next );
		}else{
			$cont.appendTo( $parent );
		}
		$cont.append( $source, $target );

		$source.css({ position : 'absolute', left : 0, top : 0, zIndex : sZI, width : width });
		$target.css({ position : 'absolute', left : 0, top : 0, zIndex : sZI, width : width }).hide();

		$.transitionEffects[ effect ](
			  $source
			, $target
			, {
				  duration : duration
				,   easing : easing
			}
			, function(){
				$source.css({ position : oSP, left : oSL, top : oST, zIndex : oSZ, width : oSW }).hide();
				$target.css({ position : oSP, left : oSL, top : oST, zIndex : oSZ, width : oSW });
				$parent.css({ position : oPP });

				if( $next.length ){
					$source.insertBefore( $next );
					$target.insertBefore( $next );
				}else{
					$source.appendTo( $parent );
					$target.appendTo( $parent );
				}

				$cont.remove();
				if( 'function' === typeof( cb ) ){ cb(); }
			}
		);

		return $source;
	};
}());