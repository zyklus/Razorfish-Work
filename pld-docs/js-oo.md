# Javascript OO Development

One of the key problems in large-scale web development is a general lack of OO practices being applied to browser-side code.  Many applications take the approach of creating DOM elements (HTML) then applying CSS – some of which is on a site-wide level, some of which applies to very localized elements – and JS chaotically as-needed.  E.G. A new piece of functionality is needed, so new HTML code gets thrown in, new CSS gets tacked on to the end of a `site.css` file, new JS gets thrown in to a `site.js` file.

Although this approach works fine for smaller sites – and on those with few changes – it quickly falls apart or becomes difficult to maintain as the complexity of the site increases.  The solution is to adopt OO practices that regularly are applied in languages such as C, Java, PHP, Ruby, etc to browser-side JS and even CSS.

## JavaScript Classes

Although the notion of a `class` is not inheriently native to JavaScript, every `function` in JS acts as a `constructor` and so class-based programming is possible.  There are even techniques and libraries available to add `inheritance` to your classes.

If you are interested in a low-level understanding of JS Classes, I will refer you to [this article][Inheritance] that I wrote around 2005.

### Classes in jQuery

jQuery does not provide a class structure, but a popular one available from jQuery's author, John Resig, is available: [Link][resigClass].  If you are interested in developing classes from this low-level, I have a [modified][mod-resigClass] version of this class that adds Namespace and property support, along with an [Observable] class that inherits from this that adds class-level events.

#### Backbone.js

[Backbone] is a JavaScript library that provides an in-browser MVC layer.

[inheritance]: http://mark-article
[resigClass]: http://resig-class
[mod-resigClass]: http://foo
[observable]: http://foo
[backbone]: http://documentcloud.github.com/backbone/