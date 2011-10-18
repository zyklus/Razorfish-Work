(function( $ ){
	var w = window;

	/**
	 * Add helper functions if they don't already exist
	 **/
	{
		w.console || ( w.console = { log : alert } );
		$.log     || ( $.log     = w.console.log );
		w.$A      || ( w.$A = $.makeArray );
	}
})( jQuery );