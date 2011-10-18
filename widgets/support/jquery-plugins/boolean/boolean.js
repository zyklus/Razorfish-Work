(function( $ ){
	$.extend( Boolean.prototype, {
		  when    : function(cb){ this.valueOf() && cb(); }
		, whenNot : function(cb){ this.valueOf() || cb(); }
	} );
})( jQuery )