<?php
/*
Plugin Name: RSS Ticker
Description: Razorfish RSS News Ticker
Version: 1.0
Author: Mark Kahn
Author URI: http://rzr.clientsite.me
*/

wp_register_script( 'rss_ticker', get_template_directory_uri() . '/functions/js/widget-rss-ticker.js' );
wp_enqueue_script ( 'rss_ticker' );

// Add function to widgets_init that'll load our widget
add_action( 'widgets_init', 'rss_reader_widgets' );

// Register widget
function rss_reader_widgets() {
	register_widget( 'RSS_Reader_Widget' );
}

// Widget class
class rss_reader_widget extends WP_Widget {
	
	function RSS_Reader_Widget() {
		// Widget settings
		$widget_ops = array(
			'classname'   => 'rss_reader_widget',
			'description' => __('A widget that displays an RSS ticker', 'framework')
		);

		// Create the widget
		$this->WP_Widget( 'rss_reader_widget', __('RSS Ticker','framework'), $widget_ops );
	}


	/*-----------------------------------------------------------------------------------*/
	/*	Display Widget
	/*-----------------------------------------------------------------------------------*/
	function widget( $args, $instance ){
		static $counter = 0;

		if( !class_exists('clApi') || !isset( $instance['uri'] ) ){ return; }

		$str   = array();
		$color = isset( $instance['color'] ) ? ' style="color:' . $instance['color'] . '"' : '';
		$id    = 'ticker-' . $counter++;
		$feed  = array();

		$feedReader = new clApi( $instance['uri'] );
		if ($RSSFeed = $feedReader->parse()) {
			foreach( $RSSFeed->get( 'item' ) as $item) {
				$feed[] = str_replace( '"', '\\"', $item->get( 'title' ) );
			}
		} else {
		  return;
		}

		$str[] = '<span class="rss-ticker" id="' . $id . '">';
		if( isset( $instance['title'] ) ){
			$str[] = '<span class="title">' . $instance['title'] . '</span>';
		}
		$str[] = 
		'<span class="ticker"' . $color . '>'     .
			'<span class="shadow left"></span>'   .
			'<span class="shadow right"></span>'  .
			'<span class="content">&nbsp;</span>' .
		'</span>';
	
		$str[] = '</span>';

		$str[] = '<script type="text/javascript">';
		$str[] = '$(function(){ new RSSTicker( "#' . $id . ' .content", ["' . implode( '", "', $feed ) . '"] ); });';
		$str[] = '</script>';

		echo implode('', $str);
	}

	/*-----------------------------------------------------------------------------------*/
	/*	Update Widget
	/*-----------------------------------------------------------------------------------*/
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;

		// Strip tags to remove HTML (important for text inputs)
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['uri']   = strip_tags( $new_instance['uri']   );
		$instance['color'] = strip_tags( $new_instance['color'] );

		return $instance;
	}

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Settings (Displays the widget settings controls on the widget panel)
	/*-----------------------------------------------------------------------------------*/
	function form( $instance ) {

		// Set up some default widget settings
		$defaults = array(
			'title' => 'RSS Ticker'
		);

		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<p>
	    	<label for="<?php echo $this->get_field_id( 'title' ); ?>">Title: </label><br />
	    	<input class="widefat" type="text" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title'];?>" />
		</p>

		<p>
	    	<label for="<?php echo $this->get_field_id( 'color' ); ?>">Ticker Color: </label><br />
	    	<input class="widefat" type="text" id="<?php echo $this->get_field_id( 'color' ); ?>" name="<?php echo $this->get_field_name( 'color' ); ?>" value="<?php echo $instance['color'];?>" />
		</p>

		<p>
			<label for="<?php echo $this->get_field_id( 'uri' ); ?>">Feed URI: </label><br />
			<input class="widefat" type="text" id="<?php echo $this->get_field_id( 'uri' ); ?>" name="<?php echo $this->get_field_name( 'uri' ); ?>" value="<?php echo $instance['uri'];?>" />
		</p>

		<?php
	}
}
?>