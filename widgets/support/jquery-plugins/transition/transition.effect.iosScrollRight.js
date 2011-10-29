$.transitionEffects.iOSScrollRight = function( $frm, $to, opts, cb ){
	var params = [];

	opts.easing   && params.unshift( opts.easing   );
	opts.duration && params.unshift( opts.duration );
	
	$to.css({
		opacity : 0
		,  left : -opts.width || -100
	}).show()
	
	$to.animate.apply( $to, [{
		opacity : 1
		,  left : 0
	}].concat( params ) );

	$frm.animate.apply( $frm, [{
		opacity : 0
		,  left : opts.width || 100
	}].concat( params, cb ) );
};