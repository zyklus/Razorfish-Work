(function( $ ){
	$.Klass.add( 'Model3D.Obj', $.Klass.Model3D, {
		init : function init(){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'obj' );

			this.bindEvents(
				'set:obj', 'onSetObj'
			);
		}

		, onSetObj : function onSetObj( obj ){
			var kls = $.Klass.get( 'File.Types.OBJ' );

			if( !kls ){
				throw new Error( 'File.Types.OBJ klass is not loaded' );
			}

			this.objFile = new kls({ file: obj });
			this.objFile.bind( 'ready', this.bindMethod( 'objReady' ) );
		}

		, objReady : function objReady( obj ){
			
		}
	} );
}( jQuery ));