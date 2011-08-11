		<!--BEGIN #sidebar .aside-->
		<div id="sidebar" class="aside">

			<a href="<?php echo home_url(); ?>">
				<span class="razorfish-logo"></span>
				<span class="fish-school"><span class="fishies"></span></span>
			</a>

			<div class="seperator clearfix">
				<div class="line"></div>
			</div>

			<?php
			if(is_page() && !is_page_template('template-portfolio.php')){
				if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar('Page Sidebar') );

			}elseif(is_page_template('template-portfolio.php') || is_tax('skill-type') || get_post_type() == 'portfolio'){
				if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar('Portfolio Sidebar') );

			}

			if(is_page_template('template-portfolio.php') || is_tax('skill-type') || get_post_type() == 'portfolio') :?>
			<div class="widget">
				<h3 class="widget-title"><?php _e('Skills', 'framework'); ?></h3>
				<ul id="filter">
					<?php if(is_page_template('template-portfolio.php')) : ?>
					<li class="current-menu-item"><a href="<?php echo get_permalink( get_option('tz_portfolio_page') ); ?>"><?php _e('All', 'framework'); ?></a></li>
					<?php else: ?>
					<li><a href="<?php echo get_permalink( get_option('tz_portfolio_page') ); ?>"><?php _e('All', 'framework'); ?></a></li>
					<?php endif; ?>
				  <?php wp_list_categories(array('title_li' => '', 'taxonomy' => 'skill-type')); ?>
				</ul>
			</div>
			<?php endif; ?>

			<!-- BEGIN #back-to-top -->
			<div id="back-to-top">
				<a href="#">
					<span class="icon"><span class="arrow"></span></span>
					<span class="text"><?php _e('Back to Top', 'framework'); ?></span>
				</a>
			<!-- END #back-to-top -->
			</div>

		<!--END #sidebar .aside-->
		</div>