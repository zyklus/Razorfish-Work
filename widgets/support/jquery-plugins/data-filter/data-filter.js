(function( $ ){
	$.extend( $.expr[':'], {
		data : function(elem, i, match) {
			var pieces = ((pieces = $(/^\s*((?:[\w_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*$/.exec(match[3])))
				.filter(function(i){
					return i>0 && i!=3 && !!pieces[i];
				})),
				type  = pieces[1],
				check = pieces[2],
				data  = $.data(elem, pieces[0]),
				value = data + '';

				return data ==  null
					? type  === "!="
					: type  === "="
					? value === check
					: type  === "*="
					? value.indexOf(check) >= 0
					: type  === "~="
					? (" " + value + " ").indexOf(check) >= 0
					: !check
					? value && data !== false
					: type  === "!="
					? value  != check 
					: type  === "^="
					? value.indexOf(check) === 0
					: type  === "$="
					? value.substr(value.length - check.length) === check
					: type  === "|="
					? value === check || value.substr(0, check.length + 1) === check + "-"
					: false;
			}
	} );
})( jQuery );