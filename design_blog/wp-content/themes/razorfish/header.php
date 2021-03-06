<!DOCTYPE html>

<!-- BEGIN html -->
<html <?php language_attributes(); ?>>

<!-- BEGIN head -->
<head>

	<!-- Meta Tags -->
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />

	<!-- Title -->
	<title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>

	<!-- Stylesheets -->
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/<?php echo get_option('tz_alt_stylesheet'); ?>" type="text/css" media="screen" />

	<!-- RSS & Pingbacks -->
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo( 'name' ); ?> RSS Feed" href="<?php if (get_option('tz_feedburner')) { echo get_option('tz_feedburner'); } else { bloginfo( 'rss2_url' ); } ?>" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<!-- Theme Hook -->
	<?php wp_head(); ?>

<!-- END head -->
</head>

<!-- BEGIN body -->
<body <?php body_class(); ?>>

	<div id="fish-bubbles"></div>
	<div id="fish-tank"></div>

	<div id="ticker-bar">
		<div id="ticker-bar-content">
			<?php
			if ( function_exists( 'dynamic_sidebar' ) ){  dynamic_sidebar('Ticker Bar'); }
			?>
			<a class="rss-link"></a>
			<a class="twitter-link"></a>
		</div>
	</div>

	<!-- BEGIN #container -->
	<div id="container" class="clearfix js-disabled">

		<div id="speckle-bg">
			<div class="top"></div>
			<div class="bg"></div>
		</div>

		<!-- Razorfish logo -->
		<div class="header-content">
			<div class="left-content logo-container">
				<a href="<?php echo home_url(); ?>">
					<span class="razorfish-logo"></span>
				</a>
			</div>

			<div class="right-content">
				<div class="padding-box">
					<span class="search-container">
						<input class="input" id="search">
						<br />
						<div class="input" id="categories">Categories</div>
					</span>
					<span class="fish-school"><span class="fishies"></span></span>
				</div>
			</div>
		</div>


		<!--BEGIN #content -->
		<div id="content">

			<?php
			if(
				function_exists( 'dynamic_sidebar' ) && (
					   is_active_sidebar( 'Overlay Column 1')
					|| is_active_sidebar( 'Overlay Column 2')
					|| is_active_sidebar( 'Overlay Column 3')
					|| is_active_sidebar( 'Overlay Column 4')
				)
			) : ?>

			<!--BEGIN #widget-overlay -->
			<div id="widget-overlay-container">

				<!--BEGIN #widget-overlay -->
				<div id="widget-overlay">

					<!--BEGIN #overlay-inner -->
					<div id="overlay-inner" class="clearfix">

						<?php for($i=1; $i<5; $i++){ ?>
							<div class="column">
								<?php dynamic_sidebar('Overlay Column ' . $i); ?>
							</div>
						<?php } ?>

					<!--END #overlay-inner -->
					</div>

				 <!--END #widget-overlay -->
				</div>

				<div id="overlay-open"><a href="#"><?php _e('Open Widget Area', 'framework'); ?></a></div>

			<!--END #widget-overlay-container -->
			</div>

			<?php endif; ?>