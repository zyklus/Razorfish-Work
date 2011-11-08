(function( $ ){
	$.Klass.add( 'MVC.View', $.Klass.MVC, {
		init : function( config ){
			this._super.apply( this, arguments );

			this.$domNode = $( '<div class="view-' + ( this.namespace ? this.namespace + '-' : '' ) + this.klassName + '"></div>' );
			this.guid     = 'view-' + (+new Date()) + Math.random().toString().substr(2);
		}

		/**
		 * run a jQuery command on `this.$domNode`
		 **/
		, runjQCmd : function( cmd, node, allowSelfContent ){
			var oNode = node;

			// handle node being a controller or view
			if( 'object' === typeof( node ) ){
				// allow the class to specify where it wants things
				if( node.getContentNode ){ node = node.getContentNode(); }

				if( $.Klass.MVC.Controller && ( node instanceof $.Klass.MVC.Controller ) ){
					node = node.view;
				}

				if( node instanceof $.Klass.MVC.View ){ node = node.$domNode; }
			}

			var res = this.$domNode[ cmd ].call(
				( allowSelfContent && this.getContentNode ) ? this.getContentNode() : this.$domNode
				, node
			);

			// trigger an event on all possible mutable events
			if( node ){ this.trigger( 'dom:' + cmd, oNode ); }
			if( oNode && oNode.trigger ){ oNode.trigger( 'dom:modified' ); }

			// if jQuery returns a non-jQuery object, return that object (e.g. offset)
			return res.jquery ? this : res;
		}

		/**
		 * A pair of pass-through functions so that functionality can be
		 *   overridden by sub-classes
		 **/
		, runjQCmdMv : function( cmd, node ){ this.runjQCmd.apply( this, arguments ); this.trigger( 'dom:moved'  , node );   return this; }
		, runjQCmdRm : function( cmd, node ){ this.runjQCmd.apply( this, arguments ); this.trigger( 'dom:removed', node ); return this; }

		/**
		 * Bridge a bunch of jQuery stuff
		 * 
		 * The methods that aren't included, e.g. `prop`, `addClass`, `css`,
		 *   etc are left out intentionally because they provide functionality
		 *   that in the context of an MVC view should be specific to the class
		 * 
		 * The methods the are included are either informative or dom-location
		 **/
		,     appendTo : function appendTo    ( node ){ return this.runjQCmdMv( 'appendTo'    , node ); }
		,    prependTo : function prependTo   ( node ){ return this.runjQCmdMv( 'prependTo'   , node ); }
		,  insertAfter : function insertAfter ( node ){ return this.runjQCmdMv( 'insertAfter' , node ); }
		, insertBefore : function insertBefore( node ){ return this.runjQCmdMv( 'insertBefore', node ); }
		,       remove : function remove      ( node ){ return this.runjQCmdRm( 'remove'      , node ); }
		,       detach : function detach      ( node ){ return this.runjQCmdRm( 'detach'      , node ); }
		,  innerHeight : function innerHeight ( node ){ return this.runjQCmd  ( 'innerHeight' , node ); }
		,   innerWidth : function innerWidth  ( node ){ return this.runjQCmd  ( 'innerWidth'  , node ); }
		,  outerHeight : function outerHeight ( node ){ return this.runjQCmd  ( 'outerHeight' , node ); }
		,   outerWidth : function outerWidth  ( node ){ return this.runjQCmd  ( 'outerWidth'  , node ); }
		,        width : function width       ( node ){ return this.runjQCmd  ( 'width'       , node ); }
		,       height : function height      ( node ){ return this.runjQCmd  ( 'height'      , node ); }
		,       offset : function offset      ( node ){ return this.runjQCmd  ( 'offset'      , node ); }
		,     position : function position    ( node ){ return this.runjQCmd  ( 'position'    , node ); }
		,   scrollLeft : function scrollLeft  ( node ){ return this.runjQCmd  ( 'scrollLeft'  , node ); }
		,    scrollTop : function scrollTop   ( node ){ return this.runjQCmd  ( 'scrollTop'   , node ); }
		,         hide : function hide        ( node ){ return this.runjQCmd  ( 'hide'        , node ); }
		,         show : function show        ( node ){ return this.runjQCmd  ( 'show'        , node ); }
		,       fadeIn : function fadeIn      ( node ){ return this.runjQCmd  ( 'fadeIn'      , node ); }
		,      fadeOut : function fadeOut     ( node ){ return this.runjQCmd  ( 'fadeOut'     , node ); }
	});
}( jQuery ));