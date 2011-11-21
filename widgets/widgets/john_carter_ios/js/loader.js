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































/*****************************************************
 * DO NOT TOUCH THIS FILE -- IT WILL GET OVERWRITTEN *
 * (unless you're looking at support/loaders/dev.js) *
 *****************************************************/































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
		 * JSON.parse & JSON.stringify
		 **/
		/* jslint: disable */
		var JSON;JSON||(JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(
		a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof 
		i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":
		return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply
		(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]"
		,gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(
		d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+
		g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this
		.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
		},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
		,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b"
		,"\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent=""
		;if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number"
		)return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(
		e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=
		String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test
		(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g
		,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()
		/* jslint: enable */

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
						files[i] = jsonRx.test( files[i] ) ? JSON.parse( data, files[i] ) : data;

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
			  ,      out = {}
			  , n, val, type;

			// walk each setting, sanitizing & setting defaults
			for( n in settings ){
				val  = queryString[ n ] || settings[ n ][ 'default' ];
				type = settings[ n ].type;

				if( val ){
					out[ n ] = 
						  ( type === 'checkbox'     ) ? !!val
						: ( type === 'multi-select' ) ? val.split( ',' )
					 	: val;
				}
			}

			// set `file` to the current file name or `index` if no name exists
			out.file = ( /\/([^\/]+)\.[^\.\/]+$/.exec(location.href) || '' )[1] || 'index';

			// pass along any JSON files
			if( conf.json ){
				out.json = conf.json;
			}

			return out;
		}


		/**
		 * Load each file and inject it into the document
		 **/
		function loadAndExecFiles( err, fileList, widgetConfig ){
			var widgetSettings = getWidgetSettings( widgetConfig )
			  ,  wJSONSettings = JSON.stringify( widgetSettings )
			  , i, n, triggers;

			/**
			 * Remove from file list:
			 * - images
			 * - files whose trigger does not match
			 **/

			for( i=fileList.length - 1; i>=0; i--) {
				triggers = null;

				// remove the triggers from the fileList and return it to a normal string
				if( fileList[i].splice ){
					triggers = '|' + fileList[i][1].join( '|' ) + '|';
					fileList[i] = fileList[i][0];
				}

				if( imgRx.test( fileList[i] ) ){
					fileList.splice( i, 1 );
					continue;
				}

				if( triggers ){
					for( n in widgetSettings ){
						if( 'string' !== typeof( widgetSettings[n] ) ){ continue; }

						triggers = triggers.replace( n + ':' + widgetSettings[n], '' );
					}

					// none of the triggers matched
					if( !~triggers.replace( /[\s,]+/, '' ).indexOf( '||' ) ){
						fileList.splice( i, 1 );
						continue;
					}
				}
			}

			loadFiles( fileList, function(){
				var args = arguments
				  , i, l, json;

				for( i=1, l=args.length; i<l; i++ ){
					if( 'string' === typeof( args[i] ) ){
						if( jsRx.test( fileList[ i-1 ] ) ){
							executeJS( args[i], wJSONSettings, !~fileList[ i-1 ].indexOf( supportDir ), fileList[ i-1 ] );
						}

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
			this.licenses    = [];
			this.jsons       = {};

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
			configLoaded : function configLoaded( err, w, j, f ){
				this.widgetConf   = w;
				this.jqVersions   = j;
				this.pluginFiles  = {};
				this.fileList     = [];
				this.minJQVersion = j.versions[0]; // set default lowest jQuery version to lowest available

				this.parseWidgetConf( w )
				    .parseFileList  ( f, '' );

				var plugins = w[ 'jqueryPlugins' ] || []
				  ,  toLoad = []
				  , i, l;

				for( i=0, l=plugins.length; i<l; i++ ){
					// allow plugins to be defined by just their name
					if( 'string' === typeof( plugins[i] ) ){
						plugins[i] = { name: plugins[i] };
					}

					// name is split so we can pull base plugin config
					this.addPlugin( plugins[i].name.split( '/' )[0] );
				}

				return this.getPlugins();
			}


			/**
			 * Parses widget config
			 **/
			, parseWidgetConf : function parseWidgetCon( obj ){
				var  minjQ = obj.minJQueryVersion
				  , testjQ = obj.testJQueryVersion
				  ,  views = obj.views
				  ,  files = obj.files
				  , i, j, k, l, m, n, file, fileIx;

				this.requireJQVersion( ( devMode ? testjQ : minjQ ) || '' );

				for( i in views ){ // i == view name

					// default the trigger to the current file name
					if( !views[i].trigger ){
						views[i].trigger = "file:" + i;
					}

					// ensure that certain properties are arrays
					views[i].files   = [].concat( views[i].files   );

					// loop all required files
					for( j=0, m=views[i].files.length; j<m; j++ ){
						file   = views[i].files[j];
						fileIx = -1;

						// find the file 
						for( k=0, n=files.length; k<n; k++ ){
							if( file === ( files[k].splice ? files[k][0] : files[k] ) ){
								fileIx = k;
								break;
							}
						}

						// file is not already included
						if( !~fileIx ){
							fileIx = files.length;
							files.push( file );
						}

						// In the widget config, make sure this file an array
						file = files[ fileIx ] = [].concat( files[ fileIx ] );

						// if this is the first view added for this file
						if( 1 === file.length ){
							file.push( [] );
						}

						// the current trigger activates this file
						file[1].push( views[i].trigger );
					}
				}

				return this;
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

				return this;
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

					// the split is so that we load the json from the root plugin
					// e.g. 'foo/bar' should load 'foo/plugin.json'
					files.push( pluginDir + p.split('/')[0] + '/plugin.json' );
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
					thisConf.dependencies = val = [].concat( val );

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

				if( val = pConf.license ){
					this.licenses.push( [ pConf.name, this.licenses.slice() ] );
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
				  ,    files = [].concat( pConf.files || [] )
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
				this.widgetConf.minJQueryVersion = this.minJQVersion;

				for( i=0, l=plugins.length; i<l; i++ ){
					this.addPluginFiles( plugins[i] );
				}

				this.addReqFiles( this.widgetConf.files || [] );

				this.loadJSON();

				return this;
			}


			/**
			 * Queues up all files for a specific plugin
			 **/
			, addPluginFiles : function( pConf, includeStack ){
				var pFiles = this.pluginConfs[ pConf.name ]
				  ,   deps = pFiles.dependencies || []
				  ,   vers = pFiles.versions     || []
				  , i, l, j, m, conf, ver, rx, tmp;

				includeStack || ( includeStack = {} );

				// prevent circular includes
				if( includeStack[ pConf.name ] ){
					throw new Error( 'Circular plugin dependency on ' + pConf.name );
				}

				// include any dependencies first
				for( i=0, l=deps.length; i<l; i++ ){
					conf = extendConf( {}, pConf );
					conf.name = deps[i];
					this.addPluginFiles( conf, includeStack );
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
				if( v > this.minJQVersion ){
					this.minJQVersion = v;
				}

				return this;
			}

			/**
			 * Loads any JSON files defined in the widget config
			 **/
			, loadJSON : function(){
				var  loading = 0
				  , jsonConf = {}
				  ,     self = this
				  , i, rFile;

				this.widgetConf.json = jsonConf;
				for( i=this.reqFiles.length-1; i>=0; i-- ){
					rFile = this.reqFiles[i];
					if( !jsonRx.test( rFile ) ){ continue; }

					( function( rFile ){
						loading++;
						loadFiles( rFile, function( err, json ){
							jsonConf[ rFile ] = json;

							if( !--loading ){
								self.triggerCB();
							}

							if( loading < 0 ){
								throw new Error( 'Somehow loaded more JSON files than were requested.  Loader is confused.' );
							}
						} );
					}( rFile ) );
				}

				// no JSON files to load
				if( !loading ){
					this.triggerCB();
				}
			}

			, triggerCB : function(){
				this.cb( null, this.reqFiles, this.widgetConf );
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