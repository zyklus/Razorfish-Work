Function.prototype.deferCallback = function( ms ){
	var self = this;

	return function(){
		var args = arguments;

		setTimeout( function(){
			self.apply( self, args );
		}, ms || 1 );
	};
};