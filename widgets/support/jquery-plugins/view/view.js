(function( $ ){
	$.Klass.add( 'View', $.Klass.MVC, {
		init : function( config ){
			this._super.apply( this, arguments );

			this.$domNode = $( '<div class="view-' + this.klassName + '"></div>' );
			this.guid     = 'view-' + (+new Date()) + Math.random().toString().substr(2);
		}

		/**
		 * run a jQuery command on `this.$domNode`
		 **/
		, runjQCmd : function( cmd, node ){
			// handle node being a controller or view
			if( node instanceof $.Klass.Controller ){ node = node.view;     }
			if( node instanceof $.Klass.View       ){ node = node.$domNode; }

			var res = this.$domNode[ cmd ].call( this.$domNode, node );

			// if jQuery returns a non-jQuery object, return that object (e.g. offset)
			return res.jquery ? this : res;
		}

		/**
		 * Bridge a bunch of jQuery stuff
		 * 
		 * The methods that aren't included, e.g. `prop`, `addClass`, `css`,
		 *   etc are left out intentionally because they provide functionality
		 *   that in the context of an MVC view should be specific to the class
		 * 
		 * The methods the are included are either informative or dom-location
		 **/
		, appendTo     : function( node ){ return this.runjQCmd( 'appendTo'    , node ); }
		, prependTo    : function( node ){ return this.runjQCmd( 'prependTo'   , node ); }
		, insertAfter  : function( node ){ return this.runjQCmd( 'insertAfter' , node ); }
		, insertBefore : function( node ){ return this.runjQCmd( 'insertBefore', node ); }
		, innerHeight  : function( node ){ return this.runjQCmd( 'innerHeight' , node ); }
		, innerWidth   : function( node ){ return this.runjQCmd( 'innerWidth'  , node ); }
		, outerHeight  : function( node ){ return this.runjQCmd( 'outerHeight' , node ); }
		, outerWidth   : function( node ){ return this.runjQCmd( 'outerWidth'  , node ); }
		, width        : function( node ){ return this.runjQCmd( 'width'       , node ); }
		, height       : function( node ){ return this.runjQCmd( 'height'      , node ); }
		, offset       : function( node ){ return this.runjQCmd( 'offset'      , node ); }
		, position     : function( node ){ return this.runjQCmd( 'position'    , node ); }
		, remove       : function( node ){ return this.runjQCmd( 'remove'      , node ); }
		, scrollLeft   : function( node ){ return this.runjQCmd( 'scrollLeft'  , node ); }
		, scrollTop    : function( node ){ return this.runjQCmd( 'scrollTop'   , node ); }
	});
})( jQuery );