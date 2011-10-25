(function( $ ){
	$.Klass.add( 'View', $.Klass.Observable, {
		init : function( config ){
			this._super.apply( this, arguments );

			this.$domNode = $( '<div></div>' );
		}

		/**
		 * run a jQuery command on `this.$domNode`
		 **/
		, runjQCmd : function( cmd, node ){
			var res = this.$domNode[ cmd ].apply( this.$domNode, [].slice.call( arguments, 1 ) );

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
		, appendTo    : function( node ){ return this.runjQCmd( 'appendTo'   , node ); }
		, innerHeight : function( node ){ return this.runjQCmd( 'innerHeight', node ); }
		, innerWidth  : function( node ){ return this.runjQCmd( 'innerWidth' , node ); }
		, outerHeight : function( node ){ return this.runjQCmd( 'outerHeight', node ); }
		, outerWidth  : function( node ){ return this.runjQCmd( 'outerWidth' , node ); }
		, width       : function( node ){ return this.runjQCmd( 'width'      , node ); }
		, height      : function( node ){ return this.runjQCmd( 'height'     , node ); }
		, offset      : function( node ){ return this.runjQCmd( 'offset'     , node ); }
		, position    : function( node ){ return this.runjQCmd( 'position'   , node ); }
		, prependTo   : function( node ){ return this.runjQCmd( 'prependTo'  , node ); }
		, remove      : function( node ){ return this.runjQCmd( 'remove'     , node ); }
		, scrollLeft  : function( node ){ return this.runjQCmd( 'scrollLeft' , node ); }
		, scrollTop   : function( node ){ return this.runjQCmd( 'scrollTop'  , node ); }
	});
})( jQuery );