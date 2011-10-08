# Frameworks

## CSS Frameworks

- [Reset] - There are various CSS Resets available, one of the most popular being from the YUI library.  The point of a CSS Reset is to remove all (or at least most) of the cross-browser CSS nuances that make pages look different in different browsers.  Depending on how in-depth the particular reset you use is, you may have to set default styles on `h1`-->`h6` tags, `button` elements, etc.

- [960 grid] is a CSS framework that breaks the page into either `40px` or `60px` grid increments.  One can't deny that it speeds up development time, but I personally never use it for one simple reason: It breaks the cardinal rule of seperating CSS styles from HTML content.  Something developed with [960 grid] can _not_ be easily re-styled to an entirely separate UI.  If that is not a requirement (and never will be), this can be a good tool.

- [Blueprint] is a simliar framework to [960 grid] and with similar issues.

[reset]: http://developer.yahoo.com/yui/reset/
[960 grid]: http://960.gs/
[blueprint]: http://www.blueprintcss.org/