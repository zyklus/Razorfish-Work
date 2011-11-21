( function( $ ){
	$.Klass.add( 'CSS3D.Environment', $.Klass.MVC.View.Mutable, {
		init : function init(){
			this._super.apply( this, arguments );
			
			this.addConfigParameters( 'perspective', 'scale' );
		}
	} );
}( jQuery ) );