# Mobile Development

## JavaScript Libraries

It should be noted that [jQuery] is a very heavy library for mobile development.  A good chunk of the jQuery core is devoted to doing away with cross-browser issues.  Since the vast majority of mobile devices use `WebKit` for their rendering, all of this cross-browser code is unnecessary bloat for a mobile device.

- [ZeptoJS] is a jQuery-like library that only works on webkit browsers.  An excellent choice for any situation where you would normally use jQuery.
- [Sencha Touch] is a mobile framework targeted more towards mobile apps than traditional sites (i.e. data-heavy with appropriate UI).  it is an excellent choice if that is the target.  Note that like other Sencha products, it is a very heavy library (large file-size) compared to others.

### Pseudo-Native Development

These libraries allow you to build apps that are native to iOS (iPhone, etc), Android and others, but build with JavaScript at the core.

- [PhoneGap] wraps your code in a native web-shell so you use HTML, CSS & JavaScript as your normally would.  An extra API is provided that bridges functionality like the GPS, Camera, Contact List, Accelerometer, etc.
- [TitaniumUI] takes a drastically different approach than [PhoneGap].  Instead of providing a web-view, all of your JavaScript ends up creating and controlling native objects & views.  The benefit of this is that you can have drastically improved performance.  The downside is that you have somewhat a lack of control over the look/feel of your app, but they look & feel like native apps -- because they are!

[jquery]:       http://www.jquery.com
[zeptojs]:      http://zeptojs.com/
[sencha touch]: http://www.sencha.com/products/touch/
[phonegap]:     http://www.phonegap.com/
[titaniumui]:   http://www.appcelerator.com/