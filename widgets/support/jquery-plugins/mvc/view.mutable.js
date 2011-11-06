/**
 * A view klass that is not meant to have any content defined by the klass, so
 *   extends more jQuery methods
 **/
(function( $ ){
	$.Klass.add( 'MVC.View.Mutable', $.Klass.MVC.View, {
		init : function( config ){
			this._super.apply( this, arguments );
		}

		// Runs a jQuery fn on the current dom node & fires off a notification of it
		, runjQCmdM : function( cmd, node ){
			this.runjQCmd.call( this, cmd, node, true );
			this.trigger( 'dom:modified', node );

			return this;
		}

		/**
		 * Bridge jQuery properties that are destructive
		 **/
		,    addClass : function addClass   ( node ){ return this.runjQCmdM( 'addClass'   , node ); }
		, removeClass : function removeClass( node ){ return this.runjQCmdM( 'removeClass', node ); }
		,      append : function append     ( node ){ return this.runjQCmdM( 'append'     , node ); }
		,         css : function css        ( node ){ return this.runjQCmdM( 'css'        , node ); }
		,       empty : function empty      ( node ){ return this.runjQCmdM( 'empty'      , node ); }
		,        html : function html       ( node ){ return this.runjQCmdM( 'html'       , node ); }
		,        attr : function attr       ( node ){ return this.runjQCmdM( 'attr'       , node ); }
		,  removeAttr : function removeAttr ( node ){ return this.runjQCmdM( 'removeAttr' , node ); }
		,        prop : function prop       ( node ){ return this.runjQCmdM( 'prop'       , node ); }
		,  removeProp : function removeProp ( node ){ return this.runjQCmdM( 'removeProp' , node ); }
		,   wrapInner : function wrapInner  ( node ){ return this.runjQCmdM( 'wrapInner'  , node ); }
	});
}( jQuery ));