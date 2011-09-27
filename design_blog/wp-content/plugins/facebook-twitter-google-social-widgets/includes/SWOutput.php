<?php
function sw_content_filter($content, $force = false) {
  $facebook = get_option('sw_facebook');
  $twitter = get_option('sw_twitter');
  $google = get_option('sw_google');
  $cssstyleall = get_option('sw_cssstyleall');
  $cssstylewidget = get_option('sw_cssstylewidget');
  $displayonposts = get_option('sw_displayonposts');
  $displayonpages = get_option('sw_displayonpages');
  $displayabovepost = get_option('sw_displayabovepost');  
  $displaybelowpost = get_option('sw_displaybelowpost');  
  if ($facebook == '') {
    $facebook = 1;
    $twitter = 2;
    $google = 3;
  }
  if ($displayonposts == '' && $displayonpages == '') {
    $displayonposts = 1;
    $displayonpages = 1;
  }
  if ($displayabovepost == '' && $displaybelowpost == '')
    $displaybelowpost = 1;

  if (!($force ||
        ($displayonposts && is_single()) ||
        ($displayonpages && is_page())))
    return $content;

  if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    $protocol = 'https';
  else
    $protocol = 'http';

  if ($facebook != 0) {
    $widgets[$facebook] =
      sprintf(
        '<div style="display:inline;' . $cssstylewidget . '"><iframe src="' . $protocol . '://www.facebook.com/plugins/like.php?href=%s&amp;send=false&amp;layout=button_count&amp;width=120&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe></div>',
        rawurlencode(get_permalink())
      );
  }

  if ($twitter != 0) {
    $widgets[$twitter] =
      sprintf(
        '<div style="display:inline;' . $cssstylewidget . '"><a href="' . $protocol . '://twitter.com/share" class="twitter-share-button" data-count="horizontal">%s</a><script type="text/javascript" src="' . $protocol . '://platform.twitter.com/widgets.js"></script></div>',
        __("Tweet", SW_DEF_STRING)
      );
  }

  if ($google != 0)
    $widgets[$google] = '<div style="display:inline;' . $cssstylewidget . '"><g:plusone size="medium"></g:plusone><script type="text/javascript">(function() { var po = document.createElement(\'script\'); po.type = \'text/javascript\'; po.async = true; po.src = \'https://apis.google.com/js/plusone.js\'; var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(po, s); })();</script></div>';

  ksort($widgets);

  $sw_content = '<div style="' . $cssstyleall . '">';
  foreach ($widgets as $widget) {
    $sw_content .= $widget;
  }
  $sw_content .= '</div>';
  
  if ($displayabovepost == 1)
    $content = $sw_content . $content;
  if ($displaybelowpost == 1)
    $content .= $sw_content;
  
	return $content;
}
add_filter('the_content', 'sw_content_filter');


/**
 * Returns the output of this plug-in for using the social widgets in your code.
 * 
 * @return string
 */
function get_the_social_widgets() {
	return sw_content_filter('', true);
}

/**
 * Directly sends the output of this plug-in to the browser.
 * 
 * @return string
 */
function the_social_widgets() {
	echo get_the_social_widgets();
}
?>