/**
 * Look through the current page and load any widgets that are defined
 **/
(function( d ){
	// cross-browser domContentLoaded
	// TODO: examine / optimize this
	{
		(function(i) {var u =navigator.userAgent;var e=/*@cc_on!@*/false; var st = 
		setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;
		if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
		else if((/mozilla/i.test(u)&&!/(compati)/.test(u)) || (/opera/i.test(u))){
		document.addEventListener("DOMContentLoaded",i,false); } else if(e){     (
		function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');
		i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})
		(init);
	}

	/**
	 * be VERY careful about using i & l -- "globalized" to compress a bit better
	 * but can leak to other functions because of it
	 **/
	var base, jQueryVersion, jQueryPath, scripts, i, l;

	function init(){
		var nodes = getElementsByClassName( 'rf-widget' )
		  ,  self = getScriptPath( 'widget-loader.js' );

		if( jQuery ){
			jQueryVersion = $.fn.jquery;
			jQueryPath    = getScriptPath( /^jquery[-._]?[.0-9]*[-._]?(min)?.js$/ ); // allows for optional version # & "min"
		}

		for( i=0, l=nodes.length; i<l; i++ ){
			initWidget( nodes[i] );
		}
	}

	// gets the path to a script included on the current page that matches `name`
	function getScriptPath( file ){
		scripts || ( scripts = d.getElementsByTagName( 'script' ) );
		
		var src, filename;

		// go backwards because last script wins
		for( i=scripts.length-1; i>=0; i-- ){
			     src = scripts[ i ].getAttribute( 'src' );
			filename = ([^\/\?#]+)(\?|#|$)/.exec( src.toLowerCase() )[ 1 ];

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

	function getElementsByClassName( c ){
		var native = d.getElementsByClassName
		  ,    qsa = d.querySelectorAll;

		if( native ){ return native.call( d, c ); }
		if( qsa ){ return qsa.call( d, '.' + c ); }

		var  divs = d.getElementsByTagName( 'div' )
		  , nodes = [];

		for( i=0, l=divs.length; i<l; i++ ){
			if( ~( ' ' + divs[i].className + ' ' ).indexOf( ' ' + c + ' ' ) ){
				nodes.push( divs[i] );
			}
		}

		return nodes;
	}

	/**
	 * Creates an iframe in the specified node that includes the appropriate widget
	 **/
	function initWidget( node ){
		var     gA = function( a ){ return node.getAttribute( a ); }
		  ,     sA = function( k, v ){ ifr.setAttribute( k, v ); }
		  , widget = gA( 'widget' )
		  ,   page = ( gA( 'page' ) || 'index' ) + '.html'
		  ,  width = parseInt( gA( 'width' )  || 0 )
		  , height = parseInt( gA( 'height' ) || 0 )
		  ,  attrs = node.attributes
		  , ignore = ' class widget width height '
		  ,    ifr = document.createElement( 'iframe' );
		  , iAttrs = []
		  ,    enc = encodeURIComponent
		  , att;

		if( jQueryPath ){
			iAttrs.push( 'jqueryPath='    + enc( jQueryPath ) );
			iAttrs.push( 'jqueryVersion=' + enc( jQueryVersion ) );
		}

		for( i=0, l=attrs.length; i<l; i++ ){
			att = attrs[i];
			if( ~ignore.indexOf( ' ' + att.name + ' ' ) ){ continue; }
			iAttrs.push( enc( att.name ) + '=' + enc( att.value ) );
		}

		sA( 'allowtransparency', 'true' );
		sA( 'frameborder'      , '0'    );
		sA( 'hspace'           , '0'    );
		sA( 'vspace'           , '0'    );
		sA( 'marginheight'     , '0'    );
		sA( 'marginwidth'      , '0'    );
		sA( 'tabindex'         , '-1'   );
		sA( 'src'              , widgetBase + '/' + widget + '/' + page + '#' + iAttrs.join( '=' ) );

		ifr.style.cssText = 'width:' + width + 'px;height:' + height + 'px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;border-top-style:none;border-right-style:none;border-bottom-stype:none;border-left-style:none;position:static;left:0px;top:0px;visibility:visible;'

		node.appendChild( ifr );
	}
}( document ));