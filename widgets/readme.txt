============================================================================================================================
README
============================================================================================================================

Widget Description:
This FreeCreditScore.com widget has been designed and constructed to foster consumer engagement through dynamic interactivity and user education, providing increased visibility and mindshare while driving qualified leads and conversions on freecreditscore.com. The widget is constructed in X/HTML, CSS, JavaScript, and jQuery, with outside functionality through sharethis.com being used to enable social sharing capabilities.

Widget Release Date:
October 17, 2011

Widget Version:
1.0

Author:
Razorfish Development

Email:
garrett.gillas@razorfish.com

Website:
razorfish.com

============================================================================================================================
FILE INFORMATION
============================================================================================================================

Widget Variations:
There are 2 variations in different sizes


"The Sound of Savings"											
     FreeCreditScore.com, public version: 300x250, 520x500
Total: 2

____________________________________________________________________________________________________________________________
Total widget variations: 2

============================================================================================================================
INSTALLATION INSTRUCTIONS
============================================================================================================================

It is important that widget file structure be kept intact.  That means all folders and files must remain together for each individual widget.  For instance, all css files must remain in their "css" subdirectory relative to the parent directory for that widget. The general structure for an individual widget should look something like below:

ROOT DIRECTORY:
	support
		jquery
		jquery-plugins
	widgets
		fcs_savings


Once widgets have been deployed to web-space, they may be included via iframe, server side include, or other methods. Below are instructions on how to implement the widget using the iframe method.

INSTALLATION:
1. Upload the widget files to a web server, ensuring that directory structure remains intact.

2. Insert an iframe into the page you wish the advertisement to appear on, by placing the following code into the html:

<iframe src="__URL_TO_WIDGET_HTML__?size=__WIDGET_SIZE__&noShare=__WIDGET_NO_SHARE__" frameborder="0" scrolling="no" style="width:__WIDGET_WIDTH__;height:__WIDGET_HEIGHT__;overflow:hidden;border:0;"></iframe>

3. Make the following substitutions to the code you placed:

__URL_TO_WIDGET_HTML__ - this should be a path to the html file for the widget.  This may be an absolute or relative path.  If the widget is on the same server as the site you are placing it into, a relative path will provide better performance.  For instance, if you are placing the Credit Nickname - 300x250 member widget, and you have placed the widget files and folders into the same directory as the html of the page you want the widget to appear on, you would replace __URL_TO_WIDGET_HTML__ with: './crednick-member_300x250.html'
If the widget is on a different server than the site you are placing it into, you will need to use an absolute path.  For instance, if you are placing the Credit Nickname - 300x250 public widget as a media buy, and you have that widget hosted somewhere, you will need to use an absolute url.  In that case, you would replace __URL_TO_WIDGET_HTML__ with something like: 'http://www.example.com/widgets/crednick-member_300x250.html'.  Obviously you would replace www.example.com/widgets with the correct web address and file structure.

__WIDGET_WIDTH__ - this should be replaced by the width of the widget in pixels.  For instance, if you were placing the Credit Nickname - 300x250 public widget, you would enter '300px'.  NOTE: it is important that you include the unit designator 'px' after the number, otherwise the widget will not be inserted correctly.

__WIDGET_HEIGHT__ - this should be replaced by the height of the widget in pixels.  For instance, if you were placing the Credit Nickname - 300x250 public widget, you would enter '250px'.  NOTE: it is important that you include the unit designator 'px' after the number, otherwise the widget will not be inserted correctly.

__WIDGET_SIZE__ - this should be "small" or "large" (default is small if left blank)

__WIDGET_NO_SHARE__ - set to "1" to disable the sharing tab


   3.a Selecting a widget size via SSI or methods other than iFrame:

      include the following JavaScript in your page:

          var widgetSettings = { size: "large" };

4. Once you have placed the code and made the substitutions, check the site to ensure the widget is functioning properly.

TROUBLESHOOTING

If the widget does not display, displays all white, or displays cut-off error text:  Check that the URL_TO_WIDGET_HTML is correct.  If you paste this url into a browser address bar, you should be able to see the widget.

If the widget appears jumbled, has incorrect placement of elements, is showing things that should be hidden, etc.:  Check structure of widget directories.  Widget may be unable to access it's css stylesheet.  Alternatively, widget may be unable to access it's JavaScript instructions.  Ensure that all folders are properly nested on server, and have proper read access permissions set.

If widget appears cut-off or distorted in width or height: Check that __WIDGET_WIDTH__ and __WIDGET_HEIGHT__ values are correct, and that they have the correct 'px' unit designation.




============================================================================================================================
DISABLING FEATURES
============================================================================================================================

TO DISABLE SHARE TAB:

  via iFrame:

     include `&noShare=1` in the widget URI.

  via SSI or other methods:

     include the following JavaScript in your page:

        var widgetSettings = { noShare : 1 };