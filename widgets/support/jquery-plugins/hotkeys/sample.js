(function( $ ){
	var hotkeys = {
		  'ENTER'  : 'new'
		, 'DELETE' : 'close'
		, 'TAB'    : 'nest'
	};

	$.each( hotkeys, function( key, cmd ){
		$( document ).bind( 'hotkey+' + key, function(){
			execCmd( cmd, ( $ || {} ).__activeItem__ );
		});
	});

	function execCmd( cmd, item ){
		// Item doesn't exist
		if( !item ){ return; }

		// Command exists, run it
		if( item[ cmd ] ){ return item[ cmd ](); }

		// pass to parent
		if( item.parent ){ return execCmd( cmd, item.parent ); }
	}
})( jQuery );