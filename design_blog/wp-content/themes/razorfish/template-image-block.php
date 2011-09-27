<!--BEGIN .hentry -->
<div <?php echo 'class="' . implode(' ', $post_class) . '"'; ?> id="post-<?php echo $post_id; ?>">

	<div class="post-thumb clearfix">
		<div class="slides">
			<div class="slides_container">
				<?php
				if( !$images || !count( $images ) ){
					$images = array( $thumb );
				}
				$shown  = false;
				foreach( $images as $img ){
					echo '<div class="img" style="' . ( $shown ? 'display:none;' : '' ) . '">' . $img . '</div>';

					$shown = true;
				} ?>
			</div>
		</div>
		<div class="tab"></div>
	</div>

	<h2 class="entry-title"><a href="<?php echo $permalink; ?>"><?php echo $title; ?></a></h2>
	<div class="entry-img-navigator"></div>

	<div class="entry-excerpt">
		<?php 
		$words = explode( ' ', $excerpt );
		echo implode( ' ', $words ); ?>
	</div>

	<?php include( 'template-block-footer.php' ); ?>

<!--END .hentry-->
</div>