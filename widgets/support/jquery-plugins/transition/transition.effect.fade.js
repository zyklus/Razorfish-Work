$.transitionEffects.fade = function( $frm, $to, opts, cb ){
	var params = [ cb ];

	opts.easing   && params.unshift( opts.easing   );
	opts.duration && params.unshift( opts.duration );

	$to.fadeIn.apply( $to, params );
};