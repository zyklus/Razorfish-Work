(function( $ ){
	$.Klass.add( 'Controller', $.Klass.MVC, {
		init : function( config ){
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				// allow specification of exact view & model to use
				'viewKlass', 'modelKlass'
			) );

			this
				.initView()
				.initModel();
		}

		/**
		 * Attempt to initialize a klass with a similar namespace, e.g.:
		 *   - from foo.bar.Controller
		 *   - to   foo.bar.View
		 **/
		, initLikeThingy : function( type ){
			// allow override of model/view klass constructor
			var thing = this[ type + 'Klass' ];

			// If the controller isn't explicitely named '.Controller', as is often the case
			if( !thing ){
				thing = $.Klass.get( this.namespace, this.klassName, type );
			}

			// pull constructor from default namespace path
			if( !thing && this.namespace ){
				thing = $.Klass.get( this.namespace, type );
			}

			// init model/view constructor
			return thing ? new thing({ controller : this }) : undefined;
		}

		, initView : function(){
			this.view = this.initLikeThingy( 'View');

			// initialize a default view if one doesn't exist for the current controller
			if( !this.view ){
				this.view = new $.Klass.View({ controller : this });
			}

			return this;
		}

		, initModel : function(){
			this.model = this.initLikeThingy( 'Model' );

			return this;
		}

		, getParent : function(){
			return this.parentController;
		}

		, bridgeToView : function( cmd, args ){
			this.view[ cmd ].apply( this.view, [].slice.call( args ) );

			return this;
		}

		/**
		 * Bridge a bunch of stuff to the view
		 **/
		, appendTo     : function( node ){ return this.bridgeToView( 'appendTo'    , arguments ); }
		, prependTo    : function( node ){ return this.bridgeToView( 'prependTo'   , arguments ); }
		, insertAfter  : function( node ){ return this.bridgeToView( 'insertAfter' , arguments ); }
		, insertBefore : function( node ){ return this.bridgeToView( 'insertBefore', arguments ); }
		, innerHeight  : function( node ){ return this.bridgeToView( 'innerHeight' , arguments ); }
		, innerWidth   : function( node ){ return this.bridgeToView( 'innerWidth'  , arguments ); }
		, outerHeight  : function( node ){ return this.bridgeToView( 'outerHeight' , arguments ); }
		, outerWidth   : function( node ){ return this.bridgeToView( 'outerWidth'  , arguments ); }
		, width        : function( node ){ return this.bridgeToView( 'width'       , arguments ); }
		, height       : function( node ){ return this.bridgeToView( 'height'      , arguments ); }
		, offset       : function( node ){ return this.bridgeToView( 'offset'      , arguments ); }
		, position     : function( node ){ return this.bridgeToView( 'position'    , arguments ); }
		, remove       : function( node ){ return this.bridgeToView( 'remove'      , arguments ); }
		, scrollLeft   : function( node ){ return this.bridgeToView( 'scrollLeft'  , arguments ); }
		, scrollTop    : function( node ){ return this.bridgeToView( 'scrollTop'   , arguments ); }
	});
})( jQuery );