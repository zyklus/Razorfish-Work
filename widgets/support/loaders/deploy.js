/**
 * Config expects:
 * - minJQueryVersion
 * - bundledJQueryVersion
 * - JQCDNPath
 * - settings
 * 
 * Querystring params allowed
 * - allowJQCDN
 **/
( function( config, cb ){
	var     jQExists = !!jQuery
	  ,    jQVersion = jQExists ? jQuery.fn.jquery : undefined
	  , minjQVersion = config.minJQueryVersion || '0'
	  , incJQVersion = config.bundledJQueryVersion
	  ,  querystring = {}
	  ,   allowJQCDN = false
	  ,        jqRef = jQuery
	  , qs, jQueryPath, jQueryVersion;

	/**
	 * Parse querystring
	 **/
	qs = location.search.substr(1).split( '&' );

	for( i=0, l=qs.length; i<l; i++ ){
		qs[i] = qs[i].split( '=' );
		queryString[ qs[i][0].toLowerCase() ] = qs[i][1];
	}

	if( queryString.allowjqcdn ){
		allowJQCDN = true;
	}

	/**
	 * pull jQuery info from parent frame -- if the parent includes the
	 *   necessary info, the current page can't possibly have jQuery
	 *   ( and if it somehow does, it's an un-expected use case so don't care )
	 **/
	jQueryPath = queryString.jquerypath;
	if( queryString.jqueryversion ){
		jQVersion = queryString.jqueryversion;
	}

	/**
	 * Returns the widget settings for the current page
	 **/
	function getWidgetSettings( conf ){
		var settings = conf.settings
		  ,      out = []
		  , n, val, type;

		// walk each setting, sanitizing & setting defaults
		for( n in settings ){
			val  = queryString[ n ] || settings[ n ][ 'default' ];
			type = settings[ n ].type;

			if( val ){
				out.push( '"' + n + '": ' +
					    ( type === 'checkbox'     ) ? !!val
					  : ( type === 'multi-select' ) ? '["' + val.split( ',' ).join( '", "' ) + '"]'
					  : '"' + val + '"'
				);
			}
		}

		// pass along any JSON files
		if( conf.json ){
			out.push( '"json": ' + JSON.stringify( conf.json ) );
		}

		return '{' + out.join( ', ' ) + '}';
	}

	/**
	 * Load JS File via script tag
	 **/
	function loadScript( src, cb ){
		var  scr = document.createElement('script')
		  , done = false;

		scr.type = 'text/javascript';
		scr.src  = src;

		scr.onreadystatechange = scr.onload = function(){
			var state = scr.readyState;

			if ( !done && ( !state || { loaded:1, complete:1 }[ state ] ) ) {
				done = true;
				cb();
			}
		};

		// use body if available. more safe in IE
		( document.body || document.getElementsByTagName( 'HEAD' )[0] ).appendChild( scr );
	}

	/**
	 * gets the path to a script included on the current page that matches `file`
	 **/
	function getScriptPath( file ){
		scripts || ( scripts = d.getElementsByTagName( 'script' ) );
		
		var src, filename;

		// go backwards because last script wins
		for( i=scripts.length-1; i>=0; i-- ){
			     src = scripts[ i ].getAttribute( 'src' );
			filename = /([^\/\?#]+)(\?|#|$)/.exec( src.toLowerCase() )[ 1 ];

			// testing a regexp
			if( RegExp === file.constructor ){
				if( file.test( filename ) ){
					return src;
				}

			// testing for a file name
			} else {
				if( file === filename ){
					return src;
				}
			}
		}
	}


	/**
	 * Does jQuery need to be loaded?
	 **/
	if( !jQExists || ( jQVersion < minjQVersion ) ){
		loadScript(
			( allowJQCDN && config.JQCDNPath )
				? config.JQCDNPath.replace( '#{version}', incJQVersion )
				: 'js/jquery-' + incJQVersion + '-min.js'
			,
			jqLoaded
		);

	}else{
		// existing version of jQuery works, but reload it so we don't mess with the current page

		// allows for optional version # & "min"
		jQueryPath = getScriptPath( /^jquery[-._]?[.0-9]*[-._]?(min)?.js$/ );

		loadScript( jQueryPath, jqLoaded );
	}

	/**
	 * jQuery is loaded, store a reference and remove it from the page
	 **/
	function jqLoaded(){
		// remove new version of jQuery from the page and return the original (if it exists)
		jqRef = jQuery.noConflict( true );
		triggerCB();
	}

	/**
	 * Run all the other codes!
	 **/
	function triggerCB(){
		cb( jqRef );
	}
} )( putWidgetSettingsHere(), function( jQuery, widgetSettings ){
	var $ = jQuery;

	// the following line is searched for and replaced.  DO NOT CHANGE
	doOtherJSStuffs();
} );