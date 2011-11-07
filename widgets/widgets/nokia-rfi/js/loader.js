/**
 * Loader for local development
 * 
 * Loading Flow:
 * - Load widget.json, support info
 * - Recursively load all plugin configs
 * - Determine appropriate jQuery version, plugin Versions
 * - Fetch all necessary files
 * - exec jQuery
 * - exec plugins in dependency / include order
 * - exec widget
 **/

(function(){
	// NON-STRICT MODE

	/**
	 * Executes code in a private scope with all properties of params exposed
	 * as local variables
	 **/
	function executeJS( code, paramStr, useStrict, file ){
		var paramVars = 'var widgetSettings = ' + paramStr + ';';

		try{
			eval(
				'(function( jQuery, $ ){\n'
					+ ( useStrict ? '"use strict";\n' : '' )
					+ paramVars + '\n'
					+ code      + '\n'
				+ '}( window.jQuery, window.jQuery ))'
			);
		}catch(err){
			throw new Error( 'Error evaluating %s: %s'.sprintf( file, err.message ) );
		}
	}

	(function(){

	"use strict";

	var   supportDir = '../../support/'
	  ,    pluginDir = supportDir + 'jquery-plugins/'
	  ,  pluginConfs = {}
	  ,       isNode = ( typeof  module !== 'undefined' )
	                && ( typeof process !== 'undefined' )
	                && ( typeof require !== 'undefined' )
	  ,  queryString = {}
	  ,      devMode = !isNode

	  ,         jsRx = /\.js$/
	  ,        cssRx = /\.css$/
	  ,       jsonRx = /\.json$/
	  ,        imgRx = /\.(png|jpe?g|gif)$/

	// Logic for sanitizing JSON -- from jQuery
	  ,  rvalidchars = /^[\],:{}\s]*$/
	  , rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g
	  , rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
	  , rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g

	// Logic for testing if local filesystem (for IE7 AJAX) -- from jQuery
	  , rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/
	  ,           rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/
	  ,   ajaxLocation = isNode ? '' : getAjaxLocation()
	  ,   ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || []
	  ,        isLocal = rlocalProtocol.test( ajaxLocParts[ 1 ] )

	  ,          xhrFn = isNode ? createNodeXHR : window.ActiveXObject ? createIEXHR : createStandardXHR

	  , i, l, qs;

	/*********************
	 * String Prototypes *
	 *********************/

	String.prototype.sprintf = function(){
		var out = this
		  , i, l;

		for( i=0, l=arguments.length; i<l; i++){
			out = out.replace('%s', arguments[i]);
		}

		return out;
	};

	String.prototype.interpolate = function(hash){
		var out = this
		  , n;

		for( n in hash ){
			if( !hash.hasOwnProperty(n) ){ continue; }

			out = out.replace(new RegExp('#\\{' + n + '\\}', 'g'), hash[n]);
		}

		return out;
	};


	/****************************
	 * General XHR Support Code *
	 ****************************/

	function getFile( uri, cb ){
		var xhr = xhrFn();

		// prevent any caching in dev mode
		xhr.open( 'GET', uri + ( devMode ? '?r=' + Math.random() : '' ) );
		xhr.onreadystatechange = function(){
			if( xhr.readyState !== 4 ){ return; }

			if( 200 !== xhr.status ){
				throw new Error( 'Error loading ' + uri );
			}

			cb( xhr.responseText );
		};
		xhr.send();
	}

	/**
	 * Mimic XHRs via fs.readFile
	 **/
	function nodeXHR(){}
	nodeXHR.prototype = {
		open : function( method, uri ){
			this.uri = require( 'path' ).resolve( __dirname,  '..',  uri );
		}
	
		, send : function(){
			var self = this;
			require( 'fs' ).readFile( this.uri, function( err, data ){
				if( err ){ throw err; }

				self.readyState   = 4;
				self.status       = 200;
				self.responseText = data.toString();

				self.onreadystatechange();
			} );
		}
	};

	function createNodeXHR(){
		return new nodeXHR();
	}


	/**
	 * For most browsers
	 **/
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch( e ) {}
	}


	/**
	 * For IE6 / IE7 in some cases
	 **/
	function createActiveXHR() {
		try {
			return new window.ActiveXObject( "Microsoft.XMLHTTP" );
		} catch( e ) {}
	}

	function createIEXHR(){
		return !isLocal && createStandardXHR() || createActiveXHR();
	}


	/*********************
	 * Low-level support *
	 *********************/

	/**
	 * Safely parse JSON (from jQuery 1.6.4)
	 **/
	function parseJSON( data, nm ) {
		var json;

		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = data.replace( /^\w+|\w+$/g, '' );

		// Attempt to parse using the native JSON parser first
		try{
			if ( ( 'undefined' !== typeof( JSON ) ) && JSON.parse ) {
				return JSON.parse( data );
			}

			// Make sure the incoming data is actual JSON
			// Logic borrowed from http://json.org/json2.js
			if ( rvalidchars.test( data.replace( rvalidescape, "@" )
				.replace( rvalidtokens, "]" )
				.replace( rvalidbraces, ""  ) ) ) {

					return (new Function( "return " + data )());
			}
		}catch(err){
			throw new Error( 'Invalid JSON from ' + nm );
		}
	}


	/**
	 * Parse queryString
	 **/
	if( !isNode ){
		qs = location.search.substr(1).split( '&' );

		for( i=0, l=qs.length; i<l; i++ ){
			qs[i] = qs[i].split( '=' );
			queryString[ qs[i][0] ] = qs[i][1];
		}
	}
	
	
	/**
	 * Function.bind for browser that don't have it
	 **/
	if( !Function.prototype.bind ){
		Function.prototype.bind = function() {
			var method = this, args = [].slice.call(arguments, 0), object = args.shift();
			return function() {
				return method.apply(object || this, args.concat( [].slice.call(arguments, 0) ));
			};
		};
	}


	/**
	 * Safely get the location of current document
	 **/
	function getAjaxLocation(){
		var ajaxLocation;

		try {
			ajaxLocation = location.href;
		} catch( e ) {
			// Use the href attribute of an A element
			// since IE will modify it given document.location
			ajaxLocation = document.createElement( "a" );
			ajaxLocation.href = "";
			ajaxLocation = ajaxLocation.href;
		}

		return ajaxLocation;
	}


	/**
	 * Load a CSS file
	 **/
	function loadCSS( path ){
		var link = document.createElement( 'link' );
		link.setAttribute( 'rel', 'stylesheet' );
		link.setAttribute( 'href', path + ( devMode ? '?r=' + Math.random() : '' ) );

		document.getElementsByTagName( 'HEAD' )[0].appendChild( link );
	}


	/**
	 * Loads any number of files in parallel.
	 * - Valid file extensions:
	 *   - js
	 *   - css
	 *   - json
	 * - Execution or inclusion of files is in proper order.
	 * - Any .json resources are passed as arguments to callbacks
	 * @param {String} files...
	 * @param {Function} callback
	 **/
	function loadFiles(){
		// accept arguments as either an array or N-arguments
		var    args = arguments
		  ,   files = [] // null = expected err argument
		  ,     cbs = []
		  , loading = 0
		  , i, l;

		args = [].concat( args[0] ).concat( [].slice.call( args, 1 ) );

		for( i=0, l=args.length; i<l; i++ ){
			( 'function' == typeof( args[i] ) ? cbs : files )
				.push( args[i] );
		}

		function doneLoading(){
			files.unshift( null ); // err object

			for( i=0, l=cbs.length; i<l; i++ ){
				cbs[i].apply( null, files );
			}
		}


		// Somewhat "stupid", don't care right now
		for( i=0, l=files.length; i<l; i++){
			(function( i ){
				if( !isNode && cssRx.test( files[i] ) ){
					return devMode ? loadCSS( files[i] ) : null;
				}

				// not sure what to do with this here if it's not .js or .json
				if( !jsRx.test( files[i] ) && !jsonRx.test( files[i] ) && !cssRx.test( files[i] ) ){
					return;
				}
				loading++;

				getFile( files[i], function( data ){
					files[i] = jsonRx.test( files[i] ) ? parseJSON( data, files[i] ) : data;

					if( --loading < 0 ){
						throw new Error( 'Loaded more files than requests.  Loader script is confused.' );
					}
					if( loading ){ return; }

					// All files are done loading
					doneLoading();
				} );
			}( i ));
		}
	}


	/**
	 * Extend objects onto another
	 **/
	function extendConf( root ){
		var i, l, n;

		for( i=1, l=arguments.length; i<l; i++ ){
			var arg = arguments[i];

			for( n in arg ){
				// merge the two together
				if( arg[n] && root[n] && ( ( Array === arg[n].constructor ) || ( Array === root[n].constructor ) ) ){
					root[n] = [].concat( root[n], arg[n] );
				}else{
					root[n] = arg[n];
				}
			}
		}

		return root;
	}


	/******************************
	 * Browser-Specific Init Code *
	 ******************************/

	/**
	 * Returns the widget settings for the current page
	 **/
	function getWidgetSettings( conf ){
		var settings = conf.settings
		  ,      out = []
		  , n, val, type;

		for( n in settings ){
			val  = queryString[ n ] || settings[ n ]['default'];
			type = settings[ n ].type;

			if( val ){
				out.push( '"%s": %s'.sprintf(
					  n
					,   ( type === 'checkbox'     ) ? !!val
					  : ( type === 'multi-select' ) ? '["' + val.split( ',' ).join( '", "' ) + '"]'
					  : '"' + val + '"'
				) );
			}
		}

		return '{' + out.join( ', ' ) + '}';
	}


	/**
	 * Load each file and inject it into the document
	 **/
	function loadAndExecFiles( err, fileList, widgetConfig ){
		var i;

		// remove image resources from file list
		for( i=fileList.length - 1; i>=0; i--) {
			if( imgRx.test( fileList[i] ) ){
				fileList.splice( i, 1 );
			}
		}

		loadFiles( fileList, function(){
			var           args = arguments
			  , widgetSettings = getWidgetSettings( widgetConfig )
			  , i, l;

			for( i=1, l=args.length; i<l; i++ ){
				if( 'string' === typeof( args[i] ) ){
					if( jsRx.test( fileList[ i-1 ] ) ){
						executeJS( args[i], widgetSettings, !~fileList[ i-1 ].indexOf( supportDir ), fileList[ i-1 ] );
					}

				}else{
					// JSON -- WTF do we do with it at this point?!?
					throw new Error( 'JSON Received in final file list -- Not sure what to do with it' );
				}
			}
		} );
	}


	/***********************************************************************
	 * Widget Loader -- Ultimately just gets a list of all necessary files *
	 ***********************************************************************/

	function WidgetLoader( cb ){
		this.cb          = cb;
		this.reqFiles    = [];
		this.reqHash     = {};
		this.pluginConfs = {};
		this.pluginQueue = {};

		loadFiles(
			  'widget.json'
			, supportDir + 'jquery/jquery-versions.json'
			, pluginDir  + 'files.json'
			, this.configLoaded.bind( this )
		);
	}

	WidgetLoader.prototype = {

		/**
		 * Initial config files -- widget, jQuery versions, file list
		 **/
		configLoaded : function( err, w, j, f ){
			this.widgetConf   = w;
			this.jqVersions   = j;
			this.pluginFiles  = {};
			this.fileList     = [];
			this.minJQVersion = j.versions[0]; // set default lowest jQuery version to lowest available

			this.parseWidgetConf( w );
			this.parseFileList  ( f, '' );

			var plugins = w[ 'jqueryPlugins' ] || []
			  ,  toLoad = []
			  , i, l;

			for( i=0, l=plugins.length; i<l; i++ ){
				// name is split so we can pull base plugin config
				this.addPlugin( plugins[i].name.split( '/' )[0] );
			}

			this.getPlugins();

			return this;
		}


		/**
		 * Parses widget config
		 **/
		, parseWidgetConf : function( obj ){
			var  minjQ = obj.minJQueryVersion
			  , testjQ = obj.testJQueryVersion;

			this.requireJQVersion( ( devMode ? testjQ : minjQ ) || '' );
		}


		/**
		 * Parses the list of all plugin files into something more usable
		 **/
		, parseFileList : function( obj, root ){
			var file;

			for( file in obj ){
				if( !obj.hasOwnProperty( file ) ){ continue; }

				if( 1 === obj[file] ){
					this.fileList.push( root + '/' + file );
				}else{
					this.parseFileList( obj[file], root + '/' + file );
				}
			}
		}


		/**
		 * Receive `plugin.json` files
		 **/
		, pluginsConfsLoaded : function( files, pluginsConf, err /*, plugin, plugin, plugin... */ ){
			var args = arguments
			  , i, l;

			for( i=3, l=args.length; i<l; i++ ){
				// set plugin name -- overwrite anything existing since it MUST be the folder name here
				args[i].name = /\/([^\/]+)\/[^\/]+$/.exec( files[ i-3 ] )[1];

				this.parsePluginConf( args[i], pluginsConf[ i-3 ] );
			}

			// recursively fetch any sub-plugins if necessary
			this.getPlugins();

			return this;
		}


		/**
		 * Add a plugin dependency
		 **/
		, addPlugin : function( p ){
			if( !this.pluginQueue[p] && !this.pluginConfs[p] ){
				this.pluginQueue[ p ] = 1;
			}

			return this;
		}


		/**
		 * Retrieve all queued plugin configs
		 **/
		, getPlugins : function(){
			var files = []
			  , i, p;

			for( p in this.pluginQueue ){
				if( this.pluginConfs[p] ){ continue; }

				files.push( pluginDir + p + '/plugin.json' );
			}
			this.pluginQueue = {};

			if( files.length ){
				// plugins to load
				files.push( this.pluginsConfsLoaded.bind( this, files, this.widgetConf.jqueryPlugins ) );
				loadFiles.apply( this, files );

			}else{
				this.compilePluginFiles();
			}


			return this;
		}


		/**
		 * Parse a single `plugin.json` file
		 **/
		, parsePluginConf : function( pConf ){
			var val, i, l, minJq, thisConf;

			this.requireJQVersion( pConf.minJQueryVersion || '' );

			pConf.root || ( pConf.root = pConf.name );

			// get a list of all files-to-be-loaded for this plugin
			thisConf = this.pluginConfs[ pConf.name ] = this.getPluginFiles( pConf );

			if( val = pConf.dependencies ){
				thisConf.dependencies = val;

				for( i=0, l=val.length; i<l; i++ ){
					this.addPlugin( val[i] );
				}
			}

			if( val = pConf.subPlugins ){
				for( i=0, l=val.length; i<l; i++ ){
					if( !val[i].name ){ throw new Error( 'Can not load subPlugin without a name' ); }

					var conf = extendConf( {}, pConf, val[i] );
					conf.name       = ( pConf.name + '/' + val[i].name ).replace( /\/\/+/g, '/' );
					conf.subPlugins = val[i].subPlugins;

					this.parsePluginConf( conf );
				}
			}

			if( val = pConf.minJQueryVersion ){
				this.requireJQVersion( val );
			}

			if( val = pConf.versions ){
				thisConf.versions = val;

				// Figure out the lowest version of jquery required amongst the available versions
				for( i=0, l=val.length; i<l; i++ ){
					if( ( val[i].minJQueryVersion || '' ) < ( minJq || 'zzz' ) ){
						minJq = val[i].minJQueryVersion;
					}
				}

				minJq && this.requireJQVersion( minJq );
			}

			return this;
		}


		/**
		 * Gets a list of all files from a single plugin, possibly to be interpolated:
		 * 
		 * #{version}
		 **/
		, getPluginFiles : function( pConf ){
			var versions = pConf.versions
			  ,    files = pConf.files
			  ,      out = []
			  ,    isVer = versions && versions.length
			  ,   verStr = pluginDir + pConf.root + ( isVer ? '/#{version}' : '' )
			  , i, l, tmp, rx;

			for( i=0, l=files.length; i<l; i++ ){
				// test if file wants to be a regex
				if( tmp = /^\/(\^)?(.*)\/([igm]*)$/.exec( files[i] ) ){
					out.push( '/' + ( tmp[1] || '' )+ verStr + tmp[2] + '/' + tmp[3] );

				}else{
					out.push( verStr + ( files[i].indexOf('/') === 0 ? '' : '/' ) + files[i] );
				}
			}

			return out;
		}


		/**
		 * Once -all- plugin files configs are loaded we can compile a list of
		 * files that actually need to be loaded
		 **/
		, compilePluginFiles : function(){
			var      wC = this.widgetConf
			  , plugins = wC.jqueryPlugins
			  , i;

			// Add appropriate jQuery version
			this.addReqFiles( supportDir + 'jquery/jquery-' + this.minJQVersion + '.js' );

			for( i=0, l=plugins.length; i<l; i++ ){
				this.addPluginFiles( plugins[i] );
			}

			this.addReqFiles( this.widgetConf.files || [] );

			this.cb( null, this.reqFiles, this.widgetConf );

			return this;
		}


		/**
		 * Queues up all files for a specific plugin
		 **/
		, addPluginFiles : function( pConf ){
			var pFiles = this.pluginConfs[ pConf.name ]
			  ,   deps = pFiles.dependencies || []
			  ,   vers = pFiles.versions     || []
			  , i, l, j, m, conf, ver, rx, tmp;

			// include any dependencies first
			for( i=0, l=deps.length; i<l; i++ ){
				conf = extendConf( {}, pConf );
				conf.name = deps[i];
				this.addPluginFiles( conf );
			}

			// determine the appropriate jQuery version
			for( i=0, l=vers.length; i<l; i++ ){
				if( vers[i].minJQueryVersion <= this.minJQVersion ){
					pConf.version = vers[i].version;
					break;
				}
			}

			// evaluate any custom params
			for( i=0, l=pFiles.length; i<l; i++ ){

				// test if file wants to be a regex
				if( tmp = /^\/(.*)\/([igm]*)$/.exec( pFiles[i] ) ){
					rx = new RegExp( tmp[1].interpolate( pConf ), tmp[2] );

					pFiles[i] = '';

					for( j=0, m=this.fileList.length; j<m; j++ ){
						if( rx.test( this.fileList[j] ) ){
							pFiles.push( this.fileList[j] );
						}
					}

				}else{
					pFiles[i] = pFiles[i].interpolate( pConf );
				}
			}

			this.addReqFiles( pFiles );
		}


		/**
		 * Adds specific files to be loaded
		 **/
		, addReqFiles : function(){
			var  args = arguments
			  , files = [].concat( args[0] ).concat( [].slice.call( args, 1 ) )
			  , i, l;

			for( i=0, l=files.length; i<l; i++ ){
				if( !files[i] || this.reqHash[ files[i] ] ){ continue; }

				this.reqFiles.push( files[i] );
				this.reqHash[ files[i] ] = 1;
			}

			return this;
		}


		/**
		 * Set plugin jQuery version to at least v
		 **/
		, requireJQVersion : function( v ){
			( v > this.minJQVersion ) && ( this.minJQVersion = v );

			return this;
		}
	};


	/************************
	 * Initialize or export *
	 ************************/
	if( isNode ){
		module.exports.WidgetLoader = WidgetLoader;
		module.exports.loadFiles    = loadFiles;
	}else{
		var foo = new WidgetLoader( loadAndExecFiles );
	}
}());
}());