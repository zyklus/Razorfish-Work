var videos = [
	  { sel: 'a.ideas'   , video: 'videos/RevisedManifesto_P12.m4v'             , screen: 'videos/idea.jpg' , width : 1280, height : 720 }
	, { sel: 'a.bing'    , video: 'videos/091310_bing_travelocity_x264.m4v'     , screen: 'videos/bing.jpg' , width : 1280, height : 720 }
	, { sel: 'a.mercedes', video: 'videos/MBTweet_Race_CS_2min_RF-720.m4v'      , screen: 'videos/tweet.jpg', width : 1280, height : 720 } 
	, { sel: 'a.lynx'    , video: 'videos/Lynx_Stream_Case_Study_611_v3-720.m4v', screen: 'videos/lynx.jpg' , width : 1280, height : 720 }
]
, i, l, vid;

$( '#site' ).fadeIn( 2000 );

/**
 * Plays a video, cancels others
 **/
function showVideo( vid ){
	var        id = 'vid' + Math.random().toString().substr(2)
	  ,  maxWidth = $( window ).width()  - 80
	  , maxHeight = $( window ).height() - 80
	  ,        rW = vid.width / maxWidth
	  ,        rH = vid.height / maxHeight
	  , div;

	// copy the vid object
	vid = $.extend( {}, vid );

	if( ( rW > 1 ) || ( rH > 1 ) ){
		if( rW > rH ){
			vid.width  = vid.width  / rW;
			vid.height = vid.height / rW;
		}else{
			vid.width  = vid.width  / rH;
			vid.height = vid.height / rH;
		}
	}

	div = $( '<div><div class="video video-js-box" id="' + id + '" style="width:' + vid.width + 'px;height:' + vid.height + 'px;"></div></div>' )
		.appendTo( document.body )
		.hide    ();

	$( '<a href="#' + id + '">')
		.fancybox({
			   padding : 0
			, onClosed : function(){
				div.remove();
			}
		})
		.trigger ( 'click' );

	$( '#' + id )
		.videoJs ( vid )
		.end();
}


/**
 * Associate all video thumbnails
 **/
for( i=0, l=videos.length; i<l; i++ ){
	vid = videos[i];

	$( vid.sel ).bind( 'click', (function( vid ){
		return function( ev ){
			ev.preventDefault();

			showVideo( vid );
		};
	}( vid )) );
}

/**
 * Add lightbox to bios
 **/
$( '#team a' ).bind( 'click', function( ev ){
	ev.preventDefault();

	var $bio = $( this ).find( '.bio' );

	$( '#team a .bio:visible' ).not( $bio ).fadeOut();
	$bio.fadeToggle();
} );

$( document.body ).bind( 'click', function( ev ){
	if( $( ev.target ).closest( '#team a' ).length ){ return; }

	$( '#team a .bio:visible' ).fadeOut();
} );