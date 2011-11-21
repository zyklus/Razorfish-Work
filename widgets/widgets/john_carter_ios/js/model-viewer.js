var $model = $( '#model' )

  , modelOptions = {
	       shader : ''
	,     texture : ''
	,   showWires : false
	, specularity : false
  }

  , environment = new $.Klass.CSS3D.Environment()
  , currentModel;

function selectModel( model ){
	if( currentModel ){
		currentModel.remove().destroy();
	}

	currentModel = new $.Klass.Model3D({
		obj : 'resources/models/%s/%s.obj'.sprintf( model, model )
	});

	currentModel
		.appendTo( $model )
		.spin    ();
}

function updateModel(){
	if( !currentModel ){ return; }

	currentModel.set( modelOptions );
}

// Bind events to top menu
$( '#model-chooser'       ).bind( 'change', function(){ selectModel( $( this ).val() ); } );
$( '#shader-chooser'      ).bind( 'change', function(){ modelOptions.shader      = $( this ).val(); updateModel(); } ).trigger( 'change' );
$( '#texture-chooser'     ).bind( 'change', function(){ modelOptions.texture     = $( this ).val(); updateModel(); } ).trigger( 'change' );
$( '#wireframe-option'    ).bind( 'change', function(){ modelOptions.showWires   = $( this ).is( ':checked' ); updateModel(); } ).trigger( 'change' );
$( '#spec-mask-option'    ).bind( 'change', function(){ modelOptions.specularity = $( this ).is( ':checked' ); updateModel(); } ).trigger( 'change' );
$( '#checkerboard-option' ).bind( 'change', function(){ $( '#model' )[ $( this ).is( ':checked' ) ? 'addClass' : 'removeClass' ]( 'checkerboard' ); } ).trigger( 'change' );
