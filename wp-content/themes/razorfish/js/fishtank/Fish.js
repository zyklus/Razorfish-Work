var Fish = function () {

	var scope = this;

	THREE.Geometry.call( this );

	// fish body
	v(   0,   3,   0);
	v(   2,   3,   0);
	v(   2, - 3,   0);
	v(   0, - 3,   0);

	v(   2,   5,   0);
	v(   6,   5,   0);
	v(   6, - 5,   0);
	v(   2, - 5,   0);

	v(   8,   5,   0);
	v(   8,   3,   0);
	v(   6,   3,   0);

	v(   6,   1,   0);
	v(   8,   1,   0);
	v(   8, - 5,   0);

	v(  10,   3,   0);
	v(  10, - 3,   0);
	v(   8, - 3,   0);

	v(  10,   1,   0);
	v(  12,   1,   0);
	v(  12, - 1,   0);
	v(  10, - 1,   0);

	// fish tail
	v( - 2,   1,   0);
	v(   0,   1,   0);
	v(   0, - 1,   0);
	v( - 2, - 1,   0);

	v( - 4,   3,   0);
	v( - 2,   3,   0);
	v( - 2, - 3,   0);
	v( - 4, - 3,   0);

	v( - 6,   5,   0);
	v( - 4,   5,   0);
	v( - 4, - 5,   0);
	v( - 6, - 5,   0);


	// fish body
	f4(  0,  1,  2,  3 );
	f4(  4,  5,  6,  7 );
	f4(  5,  8,  9, 10 );
	f4( 11, 12, 13,  6 );
	f4(  9, 14, 15, 16 );
	f4( 17, 18, 19, 20 );

	// fish tail
	f4( 21, 22, 23, 24 );
	f4( 25, 26, 27, 28 );
	f4( 29, 30, 31, 32 );

	this.computeCentroids();
	this.computeFaceNormals();


	function v( x, y, z ) {
		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f3( a, b, c ) {
		scope.faces.push( new THREE.Face3( a, b, c ) );
	}

	function f4( a, b, c, d ) {
		scope.faces.push( new THREE.Face4( a, b, c, d ) );
	}
}

Fish.prototype = new THREE.Geometry();
Fish.prototype.constructor = Fish;
