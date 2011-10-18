(function( $ ){
	var tmp;

	$.extend(Number.prototype, {
		  times     : function(cb){ var res = ''; for(var i=0; i<this; i++){ res += (cb(i) || ''); } }
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
})( jQuery )