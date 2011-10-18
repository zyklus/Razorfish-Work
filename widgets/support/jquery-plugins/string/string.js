(function( $ ){
	$.extend( String.prototype, {
		  sprintf : function(){
			var out = this;

			for( var i=0, l=arguments.length; i<l; i++ ){
				out = out.replace('%s', arguments[i]);
			}

			return out + '';
		}

		, interpolate : function(hash){
			var out = this
			  , n;

			for( n in hash ){
				out = out.replace( new RegExp('#\\{' + n + '\\}', 'g'), hash[n]);
			}

			return out+'';
		}
	} );
})( jQuery )