$.fn.videoJs = function( params ){
	params || ( params = {} );

	/**
	 * Converts any URI to absolute
	 **/
	function getURI( uri ){
		if( /^(https?:)?\/\//.test( uri ) ){ return uri; }

		return location.href.replace( /^(.*\/).*/, '$1' ) + uri;
	}

	return this.each( function(){
		if( 'string' === typeof( params ) ){
			switch( params ){
				case 'play':
					$( this ).data( 'VideoJS' ).play();
					break;

				case 'stop':
					$( this ).data( 'VideoJS' ).pause();
					break;
			}

		}else{
			var elemID = 'video' + Math.random().toString().substr(2)
			  , config = $.extend( {
					          ID : elemID
					,   autoplay : true
					, fullscreen : false
					,      width : ""
					,     height : ""
					,     screen : "../../support/jquery-plugins/video-js/blank.gif"
				}, params );
			
			config.screen = getURI( config.screen );
			config.video  = getURI( config.video );

			if( config.autoplay ){ config.html5autoplay = 'autoplay'; }

			var elem = $( this )
				.html( (
					  '<video id="#{ID}" class="video-js" width="#{width}" height="#{height}" controls preload poster="#{screen}" #{html5autoplay}>'
						+ '<source src="#{video}" type=\'video/mp4;\' />'
						+ '<!-- Flash Fallback. Use any flash video player here. Make sure to keep the vjs-flash-fallback class. -->'
						+ '<object class="vjs-flash-fallback" width="#{width}" height="#{height}" type="application/x-shockwave-flash" data="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf">'
							+ '<param name="movie" value="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf" />'
							+ '<param name="allowfullscreen" value="#{fullscreen}" />'
							+ '<param name="wmode" value="transparent" />'
							+ '<param name="flashvars" value=\'config={"playlist":["#{screen}", {"url": "#{video}","autoPlay":#{autoplay},"autoBuffering":true}]}\' />'
							+ '<img src="#{screen}" width="#{width}" height="#{height}" alt="No video playback capabilities." title="No video playback capabilities." />'
						+ '</object>'
					+ '</video>'
				).interpolate( config ) );

			elem.data( 'VideoJS', VideoJS.setup( elemID ) );
			if( !config.fullscreen ){
				elem.find( '.vjs-fullscreen-control' ).hide()
			}
		}
	} );
};