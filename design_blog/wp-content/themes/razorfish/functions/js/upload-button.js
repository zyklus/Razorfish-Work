jQuery(function($) {
	jQuery('#tz_portfolio_thumb_button').click(function() {
		
		window.send_to_editor = function(html) 
		
		{
			imgurl = jQuery('img',html).attr('src');
			jQuery('#tz_portfolio_thumb').val(imgurl);
			tb_remove();
		}
	 
	 
		tb_show('', 'media-upload.php?post_id=1&amp;type=image&amp;TB_iframe=true');
		return false;
		
	});

	5..times( function( i ){
		$( '#tz_portfolio_image_button' + ( i ? i+1 : '' ) ).bind( 'click', function(){
			window.send_to_editor = function( html ){
				var imgId = parseInt( /wp-image-([0-9]+)/.exec( $( 'img', html ).get( 0 ).className )[ 1 ] );
				$( '#tz_portfolio_image' + ( i ? i+1 : '' ) ).val( imgId );
				tb_remove();
			};

			tb_show( '', 'media-upload.php?post_id=1&amp;type=image&amp;TB_iframe=true' );
			return false;
		} );		
	} );
});
