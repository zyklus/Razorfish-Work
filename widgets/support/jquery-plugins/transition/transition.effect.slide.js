$.transitionEffects.slide = function( $frm, $to, opts, cb ){
	var params = [ cb ];

	opts.easing   && params.unshift( opts.easing   );
	opts.duration && params.unshift( opts.duration );

	$to.slideDown.apply( $to, params );
};