( function( $ ){
	var images = {};

	$.Util.imageLoader = function( path, cb ){
		var img = images[ path ]
		  , $node;

		if( img ){
			if( img.loaded ){
				return cb( img.$node );
			}else{
				img.cbs.push( cb );
			}
		}else{
			images[ path ] = img = {
				  loaded : false
				,    cbs : [ cb ]
				,  $node : $node = $( '<img src="' + path + '">' )
			};

			$node.bind( 'load', function(){
				if( img.loaded ){ return; }
				img.loaded = true;

				var n;

				for( n in img.cbs ){
					img.cbs[ n ]( img.$node );
				}
			} );

			if( $node[0].height ){
				// emulate async in case of local/cached image loads
				setTimeout( function(){
					$node.trigger( 'load' );
				}, 1 );
			}
		}
	};
}( jQuery ) );