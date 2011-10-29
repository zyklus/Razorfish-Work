$.transitionEffects.scrollLeft = function( $frm, $to, opts, cb ){
	var params = [];

	opts.easing   && params.unshift( opts.easing   );
	opts.duration && params.unshift( opts.duration );

	$to.css( 'left', $frm.outerWidth() );

	$to.animate.apply( $frm, [{
		left : 0
	}].concat( params ) );

	$frm.animate.apply( $to, [{
		left : -$to.outerWidth()
	}].concat( params, cb ) );
};