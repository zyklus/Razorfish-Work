Function.prototype.defer = function( ms ){
	setTimeout( this, ms || 1 );
};