(function(){
	var tmp;

	$.extend(String.prototype, {
		  sprintf     : function(){ }
		, interpolate : function(){ }
	});

	$.extend(Number.prototype, {
		  times     : function(cb){ for(var i=0; i<this; i++){ cb(i); } }
		, interval  : tmp = function(cb){ return setInterval(cb, this); }
		, every     : tmp
		, timeout   : function(cb){ return setTimeout(cb, this); }
		, to        : function(num, cb){ if(this < num){ for(var i=0+this; i<=num; i++){ cb(i); } }else{ for(var i=0+this; i>=num; i--){ cb(i); } } }

		, floor     : function(){ return Math.floor(this); }
		, ceil      : function(){ return Math.ceil (this); }
		, round     : function(){ return Math.round(this); }
		, abs       : function(){ return Math.abs  (this); }
		, random    : function(){ return Math.random() * this; }

		, plus      : tmp = function(num){ return this + num; }
		, add       : tmp
		, minus     : tmp = function(num){ return this - num; }
		, subtract  : tmp
		, multiply  : tmp
		, dividedBy : tmp = function(num){ return this / num; }
		, divide    : tmp

		, seconds   : function(){ return this * 1000; }
		, minutes   : function(){ return this * 60 * 1000; }
		, hours     : function(){ return this * 60 * 60 * 1000; }
		, days      : function(){ return this * 24 * 60 * 60 * 1000; }
		, weeks     : function(){ return this * 7 * 24 * 60 * 60 * 1000; }
		, years     : function(){ return this * 365.25 * 24 * 60 * 60 * 1000; }

		, ago       : function()    { return new Date(+new Date() - this);      }
		, fromNow   : function()    { return new Date(+new Date() + this);      }
		, after     : function(date){ return new Date(+new Date(date) + this);  }
		, since     : function(date){ return (+new Date()-new Date(date))/this; }
	});

	$.extend(Math, {
		  constrain : function(num, min, max){ return num < min ? min : num > max ? max : num; }
		, average   : function(){ var args = arguments, ttl = 0; for(var i=0, l=args.length; i<l; i++) ttl += args[i]; return ttl / l; }
	});

	$.extend(Boolean.prototype, {
		  when    : function(cb){ this.valueOf() && cb(); }
		, whenNot : function(cb){ this.valueOf() || cb(); }
	});

	Function.prototype.bind || (Function.prototype.bind = function() {
		var __method = this, args = [].slice.call(arguments, 0), object = args.shift();
		return function() {
			return __method.apply(object || this, args.concat( [].slice.call(arguments, 0) ));
		};
	});

	$.extend($.expr[':'], {
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
	});
})();