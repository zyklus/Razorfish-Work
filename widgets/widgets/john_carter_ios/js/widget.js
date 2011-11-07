var   $widget = $( '#widget' )
  ,   $window = $( window )
  , cylinders = []
  , bgCyl, spriteCyl1, crystal, i, l, bgHeight, widgetHeight
  , bgSound1, bgSound2, alienYell, shipPass;

/**
 * Control the size of the view
 **/
$window.bind( 'viewportResize', function( ev, w, h ){
	$widget.css({
		   width : w
		, height : widgetHeight = h
	});
});

/**
 * Splash Screen
 **/
(function(){
	var   loading = 0
	  , $progress = $( '.progress' )
	  ,   nLoaded = 0;

	function loaded( img ){
		++nLoaded;

		// $progress.css( 'width', nLoaded / loading * 242 );

		if( nLoaded === loading ){
			setTimeout( function(){
				// $( '#loading' ).fadeOut( function(){
				// 	$widget.css({ opacity: 1 });
				// } );
				
				console.log( bgCyl.$domNode.height() );
			}, 500 );
		}
	}

	function bgLoad( img ){
		loaded( img );
		bgHeight = img[0].height;
	}

//	$.Util.imageLoader( 'images/alien.png'               , loaded ); loading++;
	$.Util.imageLoader( 'images/dead_guy.png'            , loaded ); loading++;
	$.Util.imageLoader( 'images/john_carter.png'         , loaded ); loading++;
	$.Util.imageLoader( 'images/left_ship.png'           , loaded ); loading++;
	$.Util.imageLoader( 'images/logo.png'                , loaded ); loading++;
	$.Util.imageLoader( 'images/moons.png'               , loaded ); loading++;
	$.Util.imageLoader( 'images/panarama-1.jpg'          , bgLoad ); loading++;
	$.Util.imageLoader( 'images/panarama-2.jpg'          , loaded ); loading++;
	$.Util.imageLoader( 'images/panarama-3.jpg'          , loaded ); loading++;
	$.Util.imageLoader( 'images/panarama-4.jpg'          , loaded ); loading++;
	$.Util.imageLoader( 'images/right_ship.png'          , loaded ); loading++;
	$.Util.imageLoader( 'images/right_ship_shadow.png'   , loaded ); loading++;
//	$.Util.imageLoader( 'images/sword.png'               , loaded ); loading++;
	$.Util.imageLoader( 'images/textures/crystal_200.png', loaded ); loading++;
	$.Util.imageLoader( 'images/textures/box.jpg'        , loaded ); loading++;
//	$.Util.imageLoader( 'images/woman.png'               , loaded ); loading++;
}());

/**
 * Control rotation
 **/
(function(){
	var orient = new $.Klass.HTML5.Orientation()
	  , mousedown, lastX, lastY;

	orient
		.bind( 'heading', function( deg ){
			for( i=0, l=cylinders.length; i<l; i++ ){
				cylinders[i].rotateTo( deg );
			}
		} )
		.bind( 'angle', function( angle ){
			var  middle = 90
			  ,   pitch = 20
			  ,    maxY = bgHeight - widgetHeight
			  , targetY = Math.min( maxY, Math.max( 0, ( middle + pitch - angle ) / ( 2 * pitch ) * maxY ) )
			  , i, l;

			for( i=0, l=cylinders.length; i<l; i++ ){
				cylinders[i].panTo( -targetY );
			}
		} );

	$( document.body )
		.bind( 'mousedown touchstart', function( ev ){
//			ev.preventDefault();
			mousedown = ev;

			lastX = ev.pageX;
			lastY = ev.pageY;
		} )
		.bind( 'mouseup touchend', function( ev ){
			ev.preventDefault();
			mousedown = false;
		} )
		.bind( 'mousemove touchmove', function( ev ){
			if( !mousedown ){ return; }

			// only do horizontal
			if( Math.abs( ev.pageX - lastX ) > Math.abs( ev.pageY - lastY ) ){
				ev.preventDefault();

				var deg = ( ev.pageX - lastX ) / 10
				  , i, l;

				for( i=0, l=cylinders.length; i<l; i++ ){
					cylinders[i].rotateBy( -deg );
				}
			}

			lastX = ev.pageX;
			lastY = ev.pageY;
		} );
}());


/**
 * Add the background
 **/
bgCyl = new $.Klass.Cylinder.Background({
	       images : [ 'images/panarama-4.jpg', 'images/panarama-3.jpg', 'images/panarama-2.jpg', 'images/panarama-1.jpg' ]
	,       faces : 48
	, perspective : 500
});
bgCyl.appendTo( $widget );
cylinders.push( bgCyl );

/**
 * Add sprite cylinders
 **/
spriteCyl1 = new $.Klass.Cylinder({
	       radius : 1222
	, perspective : 500
}).appendTo( $widget );
cylinders.push( spriteCyl1 );

/**
 * set default rotation
 **/
for( i=0, l=cylinders.length; i<l; i++ ){
	cylinders[i].rotateTo( 15 );
}


/**
 * Add sprites
 **/
//var spriteCyl1 = new 

/**
 * Add an HTML element to a cylinder
 * 
 * conf allows:
 * - xDeg
 * - yPos
 * - zPos
 * - scale
 * - parallaxMultiplier
 **/
function addItemToCylinder( node, cylinder, conf ){
	var item = new $.Klass.Cylinder.Item( conf );

	return item.append( node ).appendTo( cylinder );
}


/**
 * Add the spinning crystal
 **/
(function(){
	crystal = new $.Klass.Sprite.Animation({
		      image : 'images/textures/crystal_200.png'
		,  imgWidth : 200
		, imgHeight : 200
		,    frames : 36
		,      rows : 6
		,      cols : 6
		,  interval : 100
	});

	var mousedown, frame;

	crystal.$domNode
		.bind( 'mousedown touchstart', function( ev ){
			ev.preventDefault();
			ev.stopPropagation();

			crystal.stop();

			mousedown = ev;
			frame     = crystal.frame;
		} );

	$widget
		.bind( 'mouseup touchend', function( ev ){
			if( !mousedown ){ return; }

			ev.preventDefault();
			ev.stopPropagation();

			mousedown = false;
			crystal.start();

		} ).bind( 'mousemove touchmove', function(ev){
			if( !mousedown ){ return; }

			ev.preventDefault();
			ev.stopPropagation();

			crystal.setFrame( frame + ( 0| ( ev.pageX - mousedown.pageX ) / 10 ) );
			ev.preventDefault();
		} );

	addItemToCylinder( crystal, spriteCyl1, { xDeg: -130, yPos: 442 } );
}());

/**
 * Add the other sprites
 **/

// alien
/*
(function(){
	var alien = addItemToCylinder( $( '<div></div>' ).css({
		background : "url( 'images/alien.png' ) no-repeat"
		,    width : 613
		,   height : 762
	}), spriteCyl1, { xDeg: -95, yPos: 1050 } )
	, triggered = false;

	alien.bindLocation( '273', function(){
		if( triggered ){ return; }

		alien.set({ yPos: 425, zPos : 200 });
		alienYell.play();

		triggered = true;
	} );
}());
*/

// dead guy
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/dead_guy.png' ) no-repeat"
	,    width : 477
	,   height : 83
}), spriteCyl1, { xDeg: -171, yPos: 675, scale: 0.9 } );


// woman
/*
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/woman.png' ) no-repeat"
	,    width : 694
	,   height : 643
}), spriteCyl1, { xDeg: -17, yPos: 567, zPos : 200 } );
*/

// flag
/*
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/flag.png' )"
	,    width : 293
	,   height : 504
}), spriteCyl1, { xDeg: -50, yPos: 235 } );
*/


// john carter
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/john_carter.png' ) no-repeat"
	,    width : 609
	,   height : 725
}), spriteCyl1, { xDeg: 106, yPos: 467, zPos : 200 } );


// left ship
(function(){
	var shipDom = $( '<div></div>' ).css({
		background : "url( 'images/left_ship.png' ) no-repeat"
		,    width : 252
		,   height : 157
	}).hide()
	, ship = addItemToCylinder( shipDom, spriteCyl1, { xDeg: 220, zPos: 500, yPos: 255, scale: 0.01 } )
	, triggered = false;

	ship.bindLocation( '325', function(){
		if( triggered ){ return; }

		shipDom.show();
		ship.set({ zPos: -200, yPos: -50, scale: 2, speed: 2 });
		shipPass.play();

		triggered = true;
	});
}());

// logo
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/logo.png' ) no-repeat"
	,    width : 914
	,   height : 671
}), spriteCyl1, { xDeg: -196, yPos: 275, zPos: 250, scale: 1.15 } );


// moons
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/moons.png' ) no-repeat"
	,    width : 415
	,   height : 359
}), spriteCyl1, { xDeg: -55, yPos: -55, parallaxMultiplier: 1.35 } );


// right ship #1 + shadow
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/right_ship.png' ) no-repeat"
	,    width : 734
	,   height : 273
}), spriteCyl1, { xDeg: 53, yPos: -125, zPos: 300, scale: 2 } );

addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/right_ship_shadow.png' ) no-repeat"
	,    width : 657
	,   height : 186
}), spriteCyl1, { xDeg: 53, yPos: 495, zPos: 300, scale: 1.6 } );


// right ship #2 + shadow
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/right_ship.png' ) no-repeat"
	,    width : 734
	,   height : 273
}), spriteCyl1, { xDeg: 86, yPos: -95, zPos: 400, scale: 0.8 } );

addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/right_ship_shadow.png' ) no-repeat"
	,    width : 657
	,   height : 186
}), spriteCyl1, { xDeg: 86, yPos: 455, zPos: 400, scale: 0.8 } );


// right ship #3 + shadow
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/right_ship.png' ) no-repeat"
	,    width : 734
	,   height : 273
}), spriteCyl1, { xDeg: 14, yPos: -145, zPos: 500 } );

addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/right_ship_shadow.png' ) no-repeat"
	,    width : 657
	,   height : 186
}), spriteCyl1, { xDeg: 14, yPos: 443, zPos: 500 } );


// sword
/*
addItemToCylinder( $( '<div></div>' ).css({
	background : "url( 'images/sword.png' ) no-repeat"
	,    width : 109
	,   height : 237
}), spriteCyl1, { xDeg: 18.6, yPos: 512 } );
*/

function newSound( file ){
	return $('<audio preload="auto"><source src="' + file + '"></audio>')
		.appendTo( document.body )
		.get(0);
}

/**
 * Add sounds
 **/
(function(){
	bgSound1  = newSound( 'resources/sounds/loop.mp3' );
	bgSound2  = newSound( 'resources/sounds/loop.mp3' );
	alienYell = newSound( 'resources/sounds/alien_yell.mp3' );
	shipPass  = newSound( 'resources/sounds/ship_pass.mp3' );

	bgSound1.play();
	$( bgSound1 ).bind( 'ended', function(){ bgSound2.play(); this.currentTime = 0; this.pause(); } );
	$( bgSound2 ).bind( 'ended', function(){ bgSound1.play(); this.currentTime = 0; this.pause(); } );
}());