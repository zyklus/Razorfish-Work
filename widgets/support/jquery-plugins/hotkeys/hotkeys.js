(function( $ ){
	var keyMappings = { // to convert to the physical key pressed
		,  33 : 49 // !
		,  34 : 39 // "
		,  35 : 51 // #
		,  36 : 52 // $
		,  37 : 53 // %
		,  38 : 55 // &
		,  40 : 57 // (
		,  41 : 48 // )
		,  42 : 56 // *
		,  43 : 61 // +
		,  58 : 59 // :
		,  60 : 44 // <
		,  62 : 46 // >
		,  63 : 47 // ?
		,  64 : 50 // @
		,  94 : 54 // ^
		,  95 : 45 // _
		, 123 : 91 // {
		, 124 : 92 // |
		, 125 : 93 // }
		, 126 : 96 // ~
		, 
	}
	  , keyNames = {
		    8 : 'DEL'
		,   9 : 'TAB'
		,  12 : 'CLEAR'
		,  13 : 'ENTER'
		,  27 : 'ESC'
		,  32 : 'SPACE'
		,  33 : 'PGUP'
		,  34 : 'PGDN'
		,  35 : 'END'
		,  36 : 'HOME'
		,  37 : 'LEFT'
		,  38 : 'UP'
		,  39 : 'RIGHT'
		,  40 : 'DOWN'
		,  46 : 'DEL'
		, 112 : 'F1'
		, 113 : 'F2'
		, 114 : 'F3'
		, 115 : 'F4'
		, 116 : 'F5'
		, 117 : 'F6'
		, 118 : 'F7'
		, 119 : 'F8'
		, 120 : 'F9'
		, 121 : 'F10'
		, 122 : 'F11'
		, 123 : 'F12'
		, 124 : 'F13'
		, 125 : 'F14'
		, 126 : 'F15'
		, 127 : 'F16'
		, 128 : 'F17'
		, 129 : 'F18'
		, 130 : 'F19'
	}
	  , lastEv = 0;

	$( document ).bind( 'keypress', function( ev ){
		/**
		 * in a couple of very specific cases, this fn is triggered
		 * by both the keypress & keydown events.  However when that
		 * happens, there is a ~0ms delay with the "good" event coming
		 * first, so ignore VERY fast events
		 **/
		{
			var evDiff = ev.timeStamp - lastEv;

			lastEv = ev.timeStamp;
			if( evDiff < 2 ){ return; }
		}

		// ignore random-ass keypresses like CTRL+DEL == 63272
		if( ev.which > 255 ) { return; }

		// Floor all keys to their base (in case of shift)
		{
			var key = ev.which;

			if( key >= 97 && key <= 122 ){ // A-Z
				key -= 32;
			}else if( keyMappings[ key ] ){
				key = keyMappings[ key ];
			}
		}

		// Generate a "Human-Readable" key-combo
		{
			var prefix =
				  ( ev.ctrlKey  ? 'C' : '' )
				+ ( ev.altKey   ? 'A' : '' )
				+ ( ev.shiftKey ? 'S' : '' )
				+ ( ev.metaKey  ? 'M' : '' )

			  , cmd = prefix + ( prefix && '+' ) + ( keyNames[ key ] || String.fromCharCode( key ) );
		}

		// fire the cmd
		$( document ).trigger( 'hotkey+' + cmd );
	} );

	// Only pass on events that don't trigger keypress:
	// - backspace               8
	// - pgup, pgdn, end, home  33-36 
	// - arrow keys             37-40
	// - delete                 46
	// - numpad *              106
	// - function keys         112-130
	// - numpad +              187
	$( document ).bind( 'keydown', function( ev ){
		var k = ev.which;
		if(
			   { 8:1, 46:1, 106:1, 187:1 }[k]
			|| (k>=33 && k<=40)
			|| (k>=112 && k<=130)
		){
			$( document ).trigger( 'keypress', ev );
		}
	} );
})( jQuery );