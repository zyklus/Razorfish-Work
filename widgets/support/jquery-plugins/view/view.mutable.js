/**
 * A view klass that is not meant to have any content defined by the klass, so
 *   extends more jQuery methods
 **/

(function( $ ){
	$.Klass.add( 'View.Mutable', $.Klass.View, {
		init : function( config ){
			this._super.apply( this, arguments );
		}

		/**
		 * Bridge jQuery properties that are destructive
		 **/
		, addClass    : function( node ){ return this.runJQCmd( 'addClass'   , node ); }
		, removeClass : function( node ){ return this.runJQCmd( 'removeClass', node ); }
		, append      : function( node ){ return this.runJQCmd( 'append'     , node ); }
		, css         : function( node ){ return this.runJQCmd( 'css'        , node ); }
		, empty       : function( node ){ return this.runJQCmd( 'empty'      , node ); }
		, html        : function( node ){ return this.runJQCmd( 'html'       , node ); }
		, attr        : function( node ){ return this.runJQCmd( 'attr'       , node ); }
		, removeAttr  : function( node ){ return this.runJQCmd( 'removeAttr' , node ); }
		, prop        : function( node ){ return this.runJQCmd( 'prop'       , node ); }
		, removeProp  : function( node ){ return this.runJQCmd( 'removeProp' , node ); }
		, wrapInner   : function( node ){ return this.runJQCmd( 'wrapInner'  , node ); }
	});
})( jQuery );