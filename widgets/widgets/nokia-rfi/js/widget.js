var videos = [
	  { sel: 'a.takeover', video: 'videos/nokia-takeover.m4v', screen: 'images/screen_nokia_takeover.jpg', width : 720, height : 540 }
	, { sel: 'a.tiles'   , video: 'videos/nokia-tiles.m4v'   , screen: 'images/screen_nokia_tiles.jpg'   , width : 960, height : 540 }
]
, i, l, vid;

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
			vid.width  = 0|vid.width  / rW;
			vid.height = 0|vid.height / rW;
		}else{
			vid.width  = 0|vid.width  / rH;
			vid.height = 0|vid.height / rH;
		}
	}

	div = $( '<div><div class="video video-js-box" id="' + id + '" style="width:' + vid.width + 'px;height:' + vid.height + 'px;"></div></div>' )
		.appendTo( document.body );

	$( '<a href="#' + id + '"></a>')
		.fancybox({
			   padding : 0
			, onClosed : function(){
				div.remove();
			}
		})
		.trigger ( 'click' );

	$( '#' + id )
		.videoJs ( vid );
}

$(function(){
	$( '#site' ).fadeIn( 2000 );

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
});