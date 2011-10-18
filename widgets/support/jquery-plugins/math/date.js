(function( $ ){
	$.extend(Math, {
		  constrain : function(num, min, max){ return num < min ? min : num > max ? max : num; }
		, average   : function(){ var args = arguments, ttl = 0; for(var i=0, l=args.length; i<l; i++) ttl += args[i]; return ttl / l; }
	});
})( jQuery )