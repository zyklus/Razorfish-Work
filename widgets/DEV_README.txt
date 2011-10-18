/*******************
 * Widget Creation *
 *******************/

To create a new widget begin by typing:

  ./build -n widget_name

This will create a base widget structure in the widgets directory.

- modify js/widget.json as needed
- add all appropriate code & resources
- build a widget deployment by following the instructions below

If you want to create a new widget and do not have `node.js` installed:
- copy support/new-widget to widgets/widget_name
- copy support/loaders/dev.js to widgets/widget_name/js/loader.js
- start developing!


WARNING: You have the option of using templating languages for HTML / CSS
  development.  Two languages are provided by default: `stylus` for css, `jade`
  for html.  If you decide not to use these languages to develop your widget,
  please DELETE any `.styl` and `.jade` files in your widget directory to
  prevent any other developers from accidentally compiling these files into
  `.css` and `.html` files, overriding any work you have done.

  Please see the section titled "Development Mode" for more information.


/**********************
 * Widget Development *
 **********************/

In order to promote best practices, and to avoid common errors, all JS code is:
  - wrapped in an anonymous function to prevent global pollution
    - There is no need to wrap widget code in an anonymous function
  - run through `jsLint`
    - Most features of jslint are disabled (i.e. most things jslint considers
      "bad" are allowed).  Specifically, jslint is run with:

          devel: true, bitwise: true, regexp: true, browser: true,
          confusion: true, undef: true, node: false, continue: true,
          sloppy: true, eqeq: false, sub: true, es5: true, vars: true,
          white: true, css: true, newcap: true, plusplus: true, maxerr: 50,
          indent: 4

    - Yes, JSLint can be annoying.  Run the build tool in dev mode (with 
      `growlnotify` installed to catch errors while you're coding.

  - strict mode is enabled
    - Key Points:
      - Must test in Firefox as it is currently the only browser to support
        this mode
      - All variables must be declared with `var` or an error will be thrown.
      - `eval` is prohibited
      - `new Function(...)` is prohibited
      - `with` is prohibited
      - `arguments.caller` and `arguments.callee` are prohibited
    - Note that I disabled some of the JSLint checks because they're stupid.
      If you think more of them should be disabled, contact me.
    - more info: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

jQuery:
  - jQuery is auto-included in all widgets (unless specifically disabled in
    widget.json).  The version of jQuery included is dependent on:
    - Any version already included in the page
    - The minimum / test versions defined in `widget.json`
    - The minimum versions defined in each jQuery plugin
  - The widget itself will always receive an isolated version of jQuery even if
    linking to the same file that the parent page contained

Widget Settings:
  - Defined by `widget.json`
  - Load order:
    - Widget will auto-load all jQuery plugins set by `jquery-plugins`
      - appropriate versions of plugin will automatically be loaded
    - Widget will auto-load all files set by `files`
      - `jQuery` (and `$`) & `widgetSettings` are exposed to all .js files


/***************
 * widget.json *
 ***************/

- version
- description
- author
- email
- uri
- jqueryPlugins
    Any plugins that need to be loaded before the widget is loaded
- minJQueryVersion
    If jQuery is present on the including page, the same reference script will
    be included to save bandwidth, but only if it meets the minimum version
    requirement.
- testJQueryVersion
    Version of jQuery to load while in dev mode
- no-jquery
    jQuery is included by default.  Set this to not include it.  Most plugins
    probably won't work.


/**********************
 * Plugin Development *
 **********************/

- Place plugins in `support/jquery-plugins/plugin-name[ /v### ]`
- Add a `plugin.json` file in the `plug-name` directory.  See an existing
    plugin for syntax.

    - name
    - version
    - versions
    - min-jquery-version
    - files
    - dependencies
    - subPlugins


/******************
 * Best Practices *
 ******************/

- jQuery Version
    It is strongly recommended that you test with older versions of jQuery and
    set your widget config to use the oldest version that it works with.  Since
    the newest available version of jQuery is bundled with widgets, allowing
    older versions of jQuery only applies in the case when the client is
    already including the older version.


/*******************
 * Dev Environment *
 *******************/

There are no strict dependencies for development, but to build & deploy, or to
  utilize Development Mode, the build scripts depend on `node.js`.

To install `node.js` on OSX or *nix/BSD:

 - Make sure you have git installed
   - type `git` from terminal to verify
   - OSX: http://code.google.com/p/git-osx-installer/ to install
 - From terminal:
   git clone --depth 1 git://github.com/joyent/node.git
   cd node
   git checkout v0.4.12
   ./configure
   make
   sudo make install

To install `node.js` on Windows:
  - Note: The 0.5.x (current when writing this) branch is a planned unstable
    branch.  Use an even minor version number (0.4.x, 0.6.x, etc) if one exists.
    If not, the 0.5.x branch should do.
 - http://nodejs.org/#download
   - Download the latest .exe
   - copy this .exe into c:\windows\system32\ (optional, though this allows
       system-wide access from `cmd` by typing `node`)
   - build commands simply become `node build <cmd>` instead of `build <cmd>`
 - Current issues:
   - Can't currently create new widgets with build script (can still do this
     manually) or run a deployment.

 - If all else fails, contact me (mark.kahn@razorfish.com) and ask me to do a
   build for you.  It only takes a moment.


/********************
 * Development Mode *
 ********************/

The build script has a built-in development mode.  This development mode
  monitors a specific widget(s) for template files of specific extensions and
  compiles them whenever they are changed.  In addition to monitoring template
  files, Dev mode monitors all .js files and applies jslint to them whenever
  they are changed.  The extensions that are monitored, along with what they
  are compiled into, are:

    .jade --> .html
    .styl --> .css

For information about jade, please see http://www.jade-lang.com
For information about stylus, please see
  http://learnboost.github.com/stylus/docs/js.html

Using jade, styl, other templates or the development mode itself is entirely
  optional and at the sole discretion of the developer.

If you have `growlnotify` installed on OSX, dev mode will hook into it.  To
  install, download growl and look in the `extras` folder of the package.  Note
  that although growl on OSX Lion is paid for some reason, older releases (such
  as 1.2.2) are free.


/*************************
 * Building a deployment *
 *************************/

Build script can be used to:
  - compile a specific widget(s)
  - deploy a specific widget(s)

type `./build`, follow instructions
  `node build` on windows

Note that since a deployment changes paths, compresses files, etc, all widgets
  should be tested in a deployment build


/********
 * TODO *
 ********/

The zip library may need to be re-built per system.  Do something here.


/**##################
 * The general plan #
 **##################/

While in dev mode, the loader should load the widget config, all necessary
  resources and an appropriate version of jQuery.  The files are loaded
  asynchrounously, with dependencies all added to the document in order.

The build script concats & compresses files in the same order as dev mode loads
  them.  All .js files (other than jQuery) are concatenated into one file, all
  .css files are concatenated as well, though the originals are kept in place
  in case different versions of the module need to load different files.

/****************
 * Contact Info *
 ****************/

The initial versions of all this created by Mark Kahn (mark.kahn@razorfish.com)
  Feel free to contact me with questions.  If they're not absurd, I'll answer
  them :)