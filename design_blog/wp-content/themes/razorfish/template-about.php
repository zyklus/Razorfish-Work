<?php
/*
Template Name: About
*/

function new_excerpt_length($length) {
	return 55;
}
add_filter('excerpt_length', 'new_excerpt_length');

wp_register_script('masonry', get_template_directory_uri().'/js/jquery.masonry.min.js', 'jquery');
wp_enqueue_script( 'masonry' );

get_header();

query_posts( array(
	'post_type'      => 'portfolio',
	'posts_per_page' => -1
) );

if (have_posts()){ ?>

<!--BEGIN #primary .hfeed-->
<div id="primary" class="hfeed">
	<!--BEGIN #masonry-->
	<div class="masonry-portfolio">

		<?php
		while (have_posts()) {
			the_post();

			$post_id     = get_the_id();
			$post_class  = get_post_class();
			$thumb	     = get_post_meta( $post_id, 'tz_portfolio_thumb', true );
			$large_image = wp_get_attachment_image_src( get_post_thumbnail_id($post_id), 'fullsize', false, '' );

			if($thumb == '')
				$thumb = get_the_post_thumbnail($post_id, 'portfolio-thumb');

			$large_image = $large_image[0];
			$excerpt     = get_the_excerpt();
			$title       = get_the_title();
			$permalink   = get_permalink();

			include('template-image-block.php');
		}
		?>
	</div>
	<!--END #masonry-->

<!--END #primary .hfeed-->
</div>

<?php
}

get_footer();
?>