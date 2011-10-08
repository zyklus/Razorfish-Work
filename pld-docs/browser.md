# General Browser Best Practices

## Doctype

The `HTML5 doctype`, simply:

    <!DOCTYPE html>

is quickly becoming the standard doctype to use.  Why?  Well the doctype itself is somewhat of a hack.  Most older browsers will not recognize it, but that's okay because _any_ doctype will set older browsers into standards mode.  The only real difference between this doctype and the hideous html4 doctypes such as:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

is that the latter doctype tells the browser that it should enforce more constraints.  _Properly written_ code will function identically between the two doctypes.  _Improperly written_ code almost always will as well, but the browser may trigger some warnings about it when in a developer mode.

## Server Optimizations

There are numerous ways to speed up the general loading of a page.  The key points are as follows:

- Reduce the # of HTTP Requests
    - Combine multiple `.js` and `.css` files into one
	- Combine multiple images into one using CSS Sprites
		- Be wary of using this technique on mobile browsers as the performance overhead of significantly large sprites can actually have more of a negative impact on some 1st / 2nd generation smart phones than the extra HTTP overhead.

- Reduce the size of served content
	- Minify all served `HTML`, `CSS`, `JS`
		- `CSS`, `JS` can usually be minified in a build process or in some cases this can be left to the web-server.
		- HTML is often dynamically generated and so needs to be compressed at runtime.  There are IIS & Apache filters to do this.
		- Deliver all content via gzip when applicable (server config)

- Use a CDN to serve static content
	- If possible, serve images from multiple sub-domains.  Since many browsers cap the number of simultaneous connections to a single domain, you can achieve faster page load times by referencing `imgs1.your-cdn.com`, `imgs2.your-cdn.com`, `imgs3.your-cdn.com`, etc.  Don't go over-board here, however, as DNS lookups are also expensive.  2-4 subdomains should provide a good speed increase without adding significant DNS lookup overhead.

- Add caching on static content
	- All static resources (images, css, javascript) should have a "Never Expire" cache set (in reality, this is usually "1 year").  These assets should be version controlled and renamed when changed.  E.g. `page-v5.js`
	- Use ETags
	- Cache AJAX assets when possible: Add eTag or Timestamp parameters to AJAX assets, e.g. `get-top-users.aspx?last-modified=12346789`

- Stylesheets belong at the top of your page
	- This prevents re-rendering of the page once the stylesheets have been downloaded.

- Scripts belong at the bottom of your page
	- Scripts block parallel  downloads of other assets
	- Unless functionality is needed to load part of the page.
	- An exception to this is putting a _"loader.js"_ file at the top of your page which asynchronously loads other script assets.

- Expansion on many of these points, along with more general tips available at:
	- http://developer.yahoo.com/performance/rules.html