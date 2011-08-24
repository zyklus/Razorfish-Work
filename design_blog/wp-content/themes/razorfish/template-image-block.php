<!--BEGIN .hentry -->
<div <?php echo 'class="' . implode(' ', $post_class) . '"'; ?> id="post-<?php echo $post_id; ?>">

	<div class="post-thumb clearfix">
		<a class="lightbox" title="<?php echo $title; ?>" href="<?php echo $large_image; ?>">
			<span class="overlay">
				<span class="icon"></span>
			</span>

			<?php echo $thumb; ?>

		</a>
		<div class="tab"></div>
	</div>

	<h2 class="entry-title"><a href="<?php echo $permalink; ?>"><?php echo $title; ?></a></h2>

	<div class="entry-excerpt">
		<?php 
		$words = explode( ' ', $excerpt );
		echo implode( ' ', $words ); ?>
	</div>

	<?php include( 'template-block-footer.php' ); ?>

<!--END .hentry-->
</div>