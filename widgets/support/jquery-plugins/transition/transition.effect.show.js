$.transitionEffects.show = function( $frm, $to, opts, cb ){
	var params = [ cb ];

	opts.easing   && params.unshift( opts.easing   );
	opts.duration && params.unshift( opts.duration );

	if( opts.easing || opts.duration ){
		$to.show.apply( $to, params );
	}else{
		$to.show();
		cb();
	}
};