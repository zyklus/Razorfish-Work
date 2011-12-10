Function.prototype.limiter = function( ms ){
	var func = this
	  , lastCall, timeout;

	function fn(){
		lastCall = +new Date();
		func();
	}

	return function(){
		var now = +new Date();

		if( !lastCall || ( ( now - lastCall ) > ms ) ){
			fn();
		}else{
			if( timeout ){
				clearTimeout( timeout );
			}
			timeout = setTimeout( fn, now + ms - lastCall );
		}
	};
};