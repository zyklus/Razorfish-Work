(function( $ ){
	$.Klass.add( 'Controller', $.Klass.MVC, {
		init : function( config ){
			this._super.apply( this, arguments );
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
			var thing = $.get( this.namespace, type );

			if( !thing ){
				// If the controller isn't explicitely named '.Controller', as is often the case
				thing = $.get( this.namespace, this.klassName, type );
			}
			return thing ? new thing({ controller : this }) : undefined;
		}

		, initView : function(){
			this.view = this.initLikeThingy( 'View ');
		}

		, initModel : function(){
			this.model = this.initLikeThingy( 'Model' );
		}

		, getParent : function(){
			return this.parentController;
		}
	});
})( jQuery );