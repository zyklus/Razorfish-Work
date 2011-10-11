# Mobile Development

## JavaScript Libraries

It should be noted that [jQuery] is a very heavy library for mobile development.  A good chunk of the jQuery core is devoted to doing away with cross-browser issues.  Since the vast majority of mobile devices use `WebKit` for their rendering, all of this cross-browser code is unnecessary bloat for a mobile device.

- [ZeptoJS] is a jQuery-like library that only works on webkit browsers.  An excellent choice for any situation where you would normally use jQuery.
- [Sencha Touch] is a mobile framework targeted more towards mobile apps than traditional sites.  A good choice if that is the target.  Note that like other Sencha products, it is a very heavy library compared to others.

[jquery]:       http://www.jquery.com
[zeptojs]:      http://zeptojs.com/
[sencha touch]: http://www.sencha.com/products/touch/