(function( $ ){
	$.extend(Math, {
		  constrain : function constrain( num, min, max ){
			return num < min ? min : num > max ? max : num;
		}

		, average   : function average(){
			var args = arguments
			  ,  ttl = 0
			  , i, l;

			for( i=0, l=args.length; i<l; i++ ){
				ttl += args[i]; 
			}

			return ttl / l;
		}
	});
})( jQuery )