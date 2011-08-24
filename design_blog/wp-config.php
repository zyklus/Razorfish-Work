<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('WP_CACHE', true); //Added by WP-Cache Manager
define('DB_NAME', 'rf_wp_db');

/** MySQL database username */
define('DB_USER', 'rf_wp_db_admin');

/** MySQL database password */
define('DB_PASSWORD', 'tort8*grated');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '8(G1lhO|O#s>ZUm9ntvS  BHhzD}t2U>AsvBc !itt%:7-_+-:`-bR(60N|PO4&K');
define('SECURE_AUTH_KEY',  '~Pyv6.t[O:GF+NV*k|TN3u99|uxRXlJKgo>H~yW79@(*(#~,*P-l&1t%?|{9]l4A');
define('LOGGED_IN_KEY',    'hL5!z96XGdzwNlq 6m^zc%O_Z*@W! k_RU813>9<cON@P=b,RL=hXR8ra+|6{f-z');
define('NONCE_KEY',        '+pY%~$2=qkN48)O@WTLbSu.9|C1`b,H693~R)NqUctht <Z8o7vOV+D5!o,Mo]jU');
define('AUTH_SALT',        '&wC?>pE1-EB|M(-2pdz]Pm|A*6bwMXK|}U$#je/jY@]Ku+-[4y=X8]qtT.1EQ0vY');
define('SECURE_AUTH_SALT', '%R<P9Eg^_}gE7*xzcXTDqQ[~+.|)Bb3DtQ6t@;J41Y^^#>nNVdPgA={E79;v<U{W');
define('LOGGED_IN_SALT',   'T~f!@[<479L@%r!rd&]Ks,9Y;&d6[+Dv~W]8Hm&keAj4$f~uot=H_)cE>h}Rz*-4');
define('NONCE_SALT',       'td)?>:uW1U8Ry/;:L-YBxc9GiBd,PC1.FH`Fk7VX#hi?^:;)3=0|hO]nL}K1I4{A');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
