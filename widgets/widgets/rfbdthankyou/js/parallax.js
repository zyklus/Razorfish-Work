var    $sections = $( 'section' )
  ,      $window = $( window )
  ,    $scroller = $( '#scroller' )
  ,     $content = $( '#content' )
  ,  $mockHeight = $( '#mock-height' )
  ,    scrHeight = 0
  ,    winHeight = 0
  ,       scrTop = 0
  ,    animProps = [ 'width', 'height', 'top', 'right', 'bottom', 'left', 'opacity', 'background-position' ]
  ,   floatProps = ' width height top right bottom left opacity '
  ,   animations = []  // list of all animation effects
  , sectionPause = 300 // how many pixels to pause when section is centered
  ,     overflow = 100 // how far animations should be triggered once off-screen
  ,    wheelMult = 10
  ,  firstScroll = false;

window.animations = animations;
$sections.each( function(){
	var $this = $( this )
	  , anim1 = {
		    $node : $this
		,   pause : sectionPause
		, scrProp : 'height'
	}
	  , anim2 = {
		    $node : $this
		, scrProp : 'height'
	}

	// record any specific animations for this section
	  , diff1 = CSSDiff( $this, 'start' )
	  , diff2 = CSSDiff( $this, 'end'   );

	anim1.start = diff1.end;
	anim1.end   = diff1.start;
	anim2.start = diff2.start;
	anim2.end   = diff2.end;

	animations.push( anim1 );

	$this.find( '.parallax' ).each( function(){
		var $this = $( this )
		  ,  anim = {};

		
	} );

	animations.push( anim2 );
} );

function propVal( $elem, prop ){
	var val = $elem.css( prop );

	return ( ~floatProps.indexOf( ' ' + prop + ' ' ) ) ? parseFloat( val ) : val;
}

// returns start/end properties of element with/without a given class name
function CSSDiff( $elem, cls ){
	var start = {}
	  ,   end = {}
	  , i, l, prop;

	$elem.removeClass( cls );

	for( i=0, l=animProps.length; i<l; i++ ){
		start[ animProps[i] ] = propVal( $elem, animProps[i] );
	}

	$elem.addClass( cls );

	for( i=0; i<l; i++ ){
		prop = propVal( $elem, animProps[i] );

		// if start & end are the same, no animation needed
		if( start[ animProps[i] ] === prop ){
			delete start[ animProps[i] ];
		}else{
			end[ animProps[i] ] = prop;
		}
	}

	$elem.removeClass( cls );

	return { start: start, end: end };
}

$scroller.bind( 'scroll', function(){
	var i, l, anim;

	for( i=0, l=animations.length; i<l; i++ ){
		anim = animations[i];

		if ( !firstScroll || ( ( anim.top < ( scrTop + winHeight + overflow ) ) && ( ( anim.top + anim.height + overflow ) > scrTop ) ) ) {

		}
	}
	firstScroll = true;
} );

$( window )
	.bind( 'resize', function(){
		var top = 0
		  , i, l, anim;

		winHeight = $window.height();
		scrHeight = 0;

		for( i=0, l=animations.length; i<l; i++ ){
			anim        = animations[i];
			anim.top    = top;
			anim.height = anim.$node.css( anim.scrProp );

			top += ( anim.scrHeight || 0 ) + ( anim.pause || 0 );
		}

		$mockHeight.css( 'height', top );
		$scroller.trigger( 'scroll' );
	}.limiter( 150 ) )
	.trigger( 'resize' );

$content.bind( 'mousewheel', function( ev, d, dX, dY ){
	$scroller.scrollTop( scrTop -= dY*wheelMult );
} );