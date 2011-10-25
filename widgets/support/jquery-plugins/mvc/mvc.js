(function( $ ){
	$.Klass.add( 'MVC', $.Klass.Observable, {
		init : function( config, optName /*, optName, optName, optName*/ ){
			var i, l;

			// call Observable constructor
			this._super();

			this.allowedConfigParameters = {};
			this.config                  = config || {};

			// add known config options
			this.addConfigParameters( 'controller' );

			// every extra argument is considered a valid config parameter
			this.addConfigParameters.apply( this, [].slice.call( arguments, 1 ) );

			// now apply all options in config
			this.set( config );
		}

		, addConfigParameters : function(){
			var opts = [].slice.call( arguments, 0 )
			  , i, l;

			for( i=0, l=opts.length; i<l; i++ ){
				if( 'string' !== typeof( opts[i] ) ){ continue; }

				this.allowedConfigParameters[ opts[i] ] = 1;
			}

			return this;
		}

		// takes all known options from config and applies to self
		, set : function( config ){
			var opt;

			for( opt in config ){
				// Sanity check for Object.prototype idiocy
				if( !config.hasOwnProperty( opt ) ){ continue; }

				this.config[ opt ] = config[ opt ];

				// to prevent accidental function replacement
				if( !this.allowedConfigParameters[ opt ] ){ continue; }

				// convienience method -- set this.opt
				this[ opt ] = config[ opt ];
			}

			return this;
		}

		, destroy : function(){
			// release stuffs -- BRUTE FORCE FTW!
			var n;
			for( n in this ){
				this[n] = null;
			}

			// not chainable ;)
		}
	});
})( jQuery );