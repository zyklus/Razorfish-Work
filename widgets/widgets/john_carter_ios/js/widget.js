var   $widget = $( '#widget' )
  ,   $window = $( window )
  , cylinders = []
  , bgCyl, spriteCyl1, crystal;

/**
 * Control the size of the view
 **/
$window.bind( 'viewportResize', function( ev, w, h ){
	$widget.css({
		   width : w
		, height : h
	});
});

/**
 * Control rotation
 **/
(function(){
	var mousedown, lastX;

	$( document.body )
		.bind( 'mousedown touchstart', function( ev ){
			mousedown = ev;

			lastX = ev.pageX;
		} )
		.bind( 'mouseup touchend', function(){
			mousedown = false;
		} )
		.bind( 'mousemove touchmove', function( ev ){
			if( !mousedown ){ return; }
			
			var deg = ( ev.pageX - lastX ) / 20
			  , i, l;

			for( i=0, l=cylinders.length; i<l; i++ ){
				cylinders[i].rotateBy( -deg );
			}

			lastX = ev.pageX;
		} );
}());


/**
 * Add the background
 **/
bgCyl = new $.Klass.Cylinder.Background({
	        image : 'images/panarama.jpg'
	,       faces : 50
	, perspective : 500
});
bgCyl.appendTo( $widget );
cylinders.push( bgCyl );

/**
 * Add sprite cylinders
 **/
spriteCyl1 = new $.Klass.Cylinder({
	       radius : 800
	, perspective : 500
}).appendTo( $widget );
cylinders.push( spriteCyl1 );

/**
 * Add sprites
 **/
//var spriteCyl1 = new 

/**
 * Add an HTML element to a cylinder
 **/
function addItemToCylinder( node, cylinder, xDeg, yPos ){
	var item = new $.Klass.Cylinder.Item({
		  xDeg : xDeg || 0
		, yPos : yPos || 0
	});

	item.append( node ).appendTo( cylinder );
}


/**
 * Add the spinning crystal
 **/
(function(){
	crystal = new $.Klass.Sprite.Animation({
		      image : 'images/textures/crystal.png'
		,  imgWidth : 400
		, imgHeight : 400
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

	addItemToCylinder( crystal, spriteCyl1, -50, 400 );
}());

function newSound( file ){
	return $('<audio preload><source src="' + file + '"></audio>')
		.appendTo( document.body )
		.get(0);
}

/**
 * Add sounds
 **/
(function(){
	var bgSound = newSound( 'resources/sounds/desert_loop.mp3' )
	, alienYell = newSound( 'resources/sounds/alien_yell.mp3' )
	,  shipPass = newSound( 'resources/sounds/ship_pass.mp3' );

	bgSound.play();
}());
