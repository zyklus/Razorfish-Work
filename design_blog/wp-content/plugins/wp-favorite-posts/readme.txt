=== WP Favorite Posts ===
Contributors: Huseyin Berberoglu
Donate link: http://nxsn.com.com/my-projects/wp-favorite-posts-plugin
Tags: favorite posts, favorite, favourite, posts, favorites,
wp-favorite-posts, reading list, post list, post lists, lists
Requires at least: 2.0.2
Tested up to: 3.0.3
Stable tag: 1.5.2

Allows visitors to add favorite posts. This plugin use cookies for saving data so
unregistered users can favorite a post.

== Description ==

Allows users to add favorite posts. This plugin use cookies and database for
saving data.

- If a user logged in then favorites data will save to database instead of cookies.
- If user not logged in data will save to cookies.

If you want you can choose "only registered users can favorite a post" option.
There is a widget named "Most Favorited Posts". And you can use this template
tag for listing most favorited posts;

<h2>Most Favorited Posts</h2>
<?php wpfp_list_most_favorited(5); ?>

If you use WP Super Cache you must add page (which you show favorites) URI to "Accepted Filenames &
Rejected URIs".

See [ChangeLog](http://svn.wp-plugins.org/wp-favorite-posts/trunk/ChangeLog.txt
"ChangeLog.txt") to learn what's different between versions.

See [more details about
plugin](http://nxsn.com/my-projects/wp-favorite-posts/)

== Installation ==

1. Unzip into your `/wp-content/plugins/` directory.
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Place `<?php if (function_exists('wpfp_link')) { wpfp_link(); } ?>` in your
single.php or page.php template file. Then favorite this post link will appear in all posts.
1. OR if you DO NOT want the favorite link to appear in every post/page, DO NOT
use the code above. Just type in [wpfp-link] into the selected post/page
content and it will embed the print link into that post/page only.
1. Create a page e.g. "Your Favorites" and insert `{{wp-favorite-posts}}`
text into content section. This page will contain users favorite posts.
1. That's it :)
