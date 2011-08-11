$(function(){
	var Boid = function() {

		var             vector = new THREE.Vector3(),
		                _width = 500,
		               _height = 500,
		                _depth = 200,
		   _neighborhoodRadius = 100,
		             _maxSpeed = 4,
		        _maxSteerForce = 0.1,
		           _avoidWalls = false,
		
		    _acceleration, _goal;

		this.position = new THREE.Vector3();
		this.velocity = new THREE.Vector3();
		_acceleration = new THREE.Vector3();

		this.setGoal = function ( target ) {
			_goal = target;
		}

		this.setAvoidWalls = function ( value ) {
			_avoidWalls = value;
		}

		this.setWorldSize = function ( width, height, depth ) {
			_width = width;
			_height = height;vector
			_depth = depth;
		}

		this.run = function ( boids ) {
			if ( _avoidWalls ) {
				vector.set( - _width, this.position.y, this.position.z );
				vector = this.avoid( vector );
				vector.multiplyScalar( 5 );
				_acceleration.addSelf( vector );

				vector.set( _width, this.position.y, this.position.z );
				vector = this.avoid( vector );
				vector.multiplyScalar( 5 );
				_acceleration.addSelf( vector );

				vector.set( this.position.x, - _height, this.position.z );
				vector = this.avoid( vector );
				vector.multiplyScalar( 5 );
				_acceleration.addSelf( vector );

				vector.set( this.position.x, _height, this.position.z );
				vector = this.avoid( vector );
				vector.multiplyScalar( 5 );
				_acceleration.addSelf( vector );

				vector.set( this.position.x, this.position.y, - _depth );
				vector = this.avoid( vector );
				vector.multiplyScalar( 5 );
				_acceleration.addSelf( vector );

				vector.set( this.position.x, this.position.y, _depth );
				vector = this.avoid( vector );
				vector.multiplyScalar( 5 );
				_acceleration.addSelf( vector );
			}/* else {
				this.checkBounds();
			}
			*/

			if ( Math.random() > 0.5 ) {
				this.flock( boids );
			}

			this.move();
		}

		this.flock = function ( boids ) {
			if ( _goal ) {
				_acceleration.addSelf( this.reach( _goal, 0.005 ) );
			}

			var fBoids = [], boid, bP,
			        tP = this.positionm
			      dist = [],
			    sorter = [];

			for(var i=boids.length-1; i>=0; i--){
				var distance = boids[i].position.distanceTo( this.position );
		
				if(distance>0 && distance<=_neighborhoodRadius){
					dist.push(distance);
					fBoids.push(boids[i]);
				}
			}

			dist.sort(function(a, b, c){
				return (sorter.push(c = a < b ? -1 : 1), c);
			});
			fBoids.sort(function(){
				return sorter.shift();
			});
			fBoids.splice(6);

			_acceleration.addSelf( this.alignment ( fBoids ) );
			_acceleration.addSelf( this.cohesion  ( fBoids ) );
			_acceleration.addSelf( this.separation( fBoids ) );
		}

		this.move = function () {

			this.velocity.addSelf( _acceleration );

			var l = this.velocity.length();

			if ( l > _maxSpeed ) {
				this.velocity.divideScalar( l / _maxSpeed );
			}

			this.position.addSelf( this.velocity );
			_acceleration.set( 0, 0, 0 );
			
			if((this.targetScale === 0) || this.targetScale && (this.targetScale != this.mesh.scale.x)){
				var diff = this.targetScale - this.mesh.scale.x;

				if((this.targetScale==0) && (this.mesh.scale.x <= 0)){
					for(var i=0, l=fishes.length; i<l; i++){
						if(fishes[i] === this.mesh){
							fishes.splice(i, 1);
							boids .splice(i, 1);
						}
						break;
					}
				}else{
					this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 
						(Math.abs(diff) < .01
							? this.targetScale
						: diff < 0
							? this.mesh.scale.x - .01
							: this.mesh.scale.x + .01
						);
				}
			}
		}

		this.checkBounds = function () {

			if ( this.position.x >   _width  ) this.position.x = - _width;
			if ( this.position.x < - _width  ) this.position.x =   _width;
			if ( this.position.y >   _height ) this.position.y = - _height;
			if ( this.position.y < - _height ) this.position.y =   _height;
			if ( this.position.z >   _depth  ) this.position.z = - _depth;
			if ( this.position.z < - _depth  ) this.position.z =   _depth;

		}

		this.avoid = function ( target ) {
			var steer = new THREE.Vector3();

			steer.copy( this.position );
			steer.subSelf( target );

			steer.multiplyScalar( 1 / this.position.distanceToSquared( target ) );

			return steer;

		}

		this.repulse = function ( target ) {
			var distance = this.position.distanceTo( target );

			if ( distance < 150 ) {
				var steer = new THREE.Vector3();

				steer.sub( this.position, target );
				steer.multiplyScalar( 0.5 / distance );

				_acceleration.addSelf( steer );
			}
		}

		this.reach = function ( target, amount ) {
			var steer = new THREE.Vector3();

			steer.sub( target, this.position );
			steer.multiplyScalar( amount );

			return steer;
		}

		this.alignment = function ( boids ) {
			var boid, velSum = new THREE.Vector3(),
			count = 0;

			for ( var i = 0, il = boids.length; i < il; i++ ) {
				if ( Math.random() > 0.6 ) continue;

				boid = boids[ i ];

				velSum.addSelf( boid.velocity );
				count++;
			}

			if ( count > 0 ) {
				velSum.divideScalar( count );
				var l = velSum.length();

				if ( l > _maxSteerForce ) {
					velSum.divideScalar( l / _maxSteerForce );
				}
			}

			return velSum;
		}

		this.cohesion = function ( boids ) {
			var boid,
			posSum = new THREE.Vector3(),
			steer  = new THREE.Vector3(),
			count  = 0;

			for ( var i = 0, il = boids.length; i < il; i ++ ) {
				if ( Math.random() > 0.6 ) continue;

				boid = boids[ i ];

				posSum.addSelf( boid.position );
				count++;
			}

			if ( count > 0 ) {
				posSum.divideScalar( count );
			}

			steer.sub( posSum, this.position );

			var l = steer.length();

			if ( l > _maxSteerForce ) {
				steer.divideScalar( l / _maxSteerForce );
			}

			return steer;
		}

		this.separation = function ( boids ) {
			var boid,
			posSum  = new THREE.Vector3(),
			repulse = new THREE.Vector3();

			for ( var i = 0, il = boids.length; i < il; i ++ ) {
				if ( Math.random() > 0.6 ) continue;

				boid     = boids[ i ];
				distance = boid.position.distanceTo( this.position );

				repulse.sub( this.position, boid.position );
				repulse.normalize();
				repulse.divideScalar( distance );
				posSum.addSelf( repulse );
			}

			return posSum;
		}
	}

	var SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH_HALF, SCREEN_HEIGHT_HALF,
	    camera, scene, renderer,
	    fishes, fish,
	    boid, boids,
	    lastUpdate,

		     maxFish = 30,
        minFramerate = 50,
	           $tank = $('#fish-tank');

	// init screen size params
	onResize();
	init();
	animate();

	function addFish(){
		if(boids.length >= maxFish){ return; }

		var boid, fish;

		boids.push( boid = new Boid() );
		boid.position.x = Math.random() * 400 - 200;
		boid.position.y = Math.random() * 400 - 200;
		boid.position.z = Math.random() * 400 - 200;
		boid.velocity.x = Math.random() * 2 - 1;
		boid.velocity.y = Math.random() * 2 - 1;
		boid.velocity.z = Math.random() * 2 - 1;
		boid.setAvoidWalls( true );
		boid.setWorldSize( 500, 500, 400 );

		fishes.push( boid.mesh = fish = new THREE.Mesh( new Fish(), new THREE.MeshBasicMaterial( { color: 0x5E607B } ) ) );

		fish.phase       = Math.floor( Math.random() * 62.83 );
		fish.position    = boid.position;
		fish.doubleSided = true;

		boid.targetScale = .5 + Math.random();
		fish.scale.x = fish.scale.y = fish.scale.z = .01;

		scene.addObject( fish );
	}

	// remove a random fish
	function removeFish(){
		if(boids.length < 10){ return; }

		boids[ boids.length - 1 ].targetScale = 0;
	}

	function init() {
		camera = new THREE.Camera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
		camera.position.z = 450;

		scene  = new THREE.Scene();

		fishes = [];
		boids  = [];

		for ( var i = 0; i < 10; i ++ ) {
			addFish();
		}

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

		$(document.body)
			.bind ( 'mousemove', onMouseMove );

		$(window)
			.bind ( 'resize', onResize );

		$tank.append( renderer.domElement );

		// run the animation for a very short time so the fish aren't quite so scattered to start
		var now = (+new Date());
		while((+new Date() - now) < 50){
			for(var j=0; j<boids.length; j++){
				boids[j].run( boids );
			}
		}
	}

	function onResize(){
		var w = $tank.width(),
		    h = $tank.height();

		SCREEN_WIDTH       = w;
		SCREEN_HEIGHT      = h;
		SCREEN_WIDTH_HALF  = w>>1;
		SCREEN_HEIGHT_HALF = h>>1;

		renderer && renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	}

	function onMouseMove( event ) {
		var vector = new THREE.Vector3( event.pageX - SCREEN_WIDTH_HALF, - event.pageY + SCREEN_HEIGHT_HALF, 0 );

		for ( var i = 0, il = boids.length; i < il; i++ ) {
			boid     = boids[ i ];
			vector.z = boid.position.z;
			boid.repulse( vector );
		}
	}

	function animate() {
		requestAnimationFrame( animate );

		render();

		if(lastUpdate){
			var fps = 1000/(+new Date() - lastUpdate);

			if(fps > (1.25 * minFramerate)){ addFish();    }
			if(fps < (0.8 * minFramerate)){ removeFish(); }
		}

		lastUpdate = +new Date();
	}

	function render() {
		for ( var i = 0, il = fishes.length; i < il; i++ ) {
			boid = boids[ i ];
			boid.run( boids, true );

			fish = fishes[ i ];

			color = fish.materials[ 0 ].color;
			color.setHSV(.65, .24, 1 - ( 500 - fish.position.z ) / 1000);

			fish.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
			fish.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );

			fish.phase = ( fish.phase + ( Math.max( 0, fish.rotation.z ) + 0.1 )  ) % 62.83;
			fish.sinPhase = Math.sin( fish.phase );

			fish.geometry.vertices[ 21 ].position.z =
			fish.geometry.vertices[ 24 ].position.z =
			fish.geometry.vertices[ 26 ].position.z =
			fish.geometry.vertices[ 27 ].position.z =
				fish.sinPhase * .5;
		
			fish.geometry.vertices[ 25 ].position.z =
			fish.geometry.vertices[ 28 ].position.z =
			fish.geometry.vertices[ 30 ].position.z =
			fish.geometry.vertices[ 31 ].position.z =
				fish.sinPhase * 1.25;

			fish.geometry.vertices[ 29 ].position.z =
			fish.geometry.vertices[ 32 ].position.z =
				fish.sinPhase * 3;

			fish.geometry.__dirtyVertices = true;
		}

	//	renderer.clear();
		renderer.render( scene, camera );
	}
});