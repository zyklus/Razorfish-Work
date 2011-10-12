# JavaScript Libraries

A brief comparison of some of the more popular JavaScript libraries available.  It should be noted that just about every common JavaScript library under the sun provides the same core functionality:

- CSS Selectors
- AJAX support
- Event Binding
- DOM Traversal & Manipulation

Since the differences in how individual libraries provide the above is almost entirely syntactical, this document will ignore the above and focus on other differences between the libraries.

### In the jQuery universe:

- [jQuery] is currently the most popular JavaScript library in the world.  It allows for quick development of relatively simple tasks and there are thousands of available plugins for it.  The jQuery coding style is focused around the concept of _chaining_, that is commands run off of one-another:
    
        $( '.selector' ).hide().appendTo( '.newParent' ).fadeIn();

  The main draw-back to jQuery is, in this author's opinion, the fact that it allows and even encourages a sloppy coding style.  Developers are often led to doing things the quick way instead of the correct way.  ALthough in many circumstances this has very little impact on the final site, when apps start to grow it can have a large impact on both the usability and speed of a web application.

  That being said, jQuery is an excellent choice as a core library in just about any situation, though in situations with larger code bases, you may want to supplement it with a more structured base such as:

- [Backbone] provides somewhat of an MVC framework to front-end development.  It requires the [Underscore] library.

- [jQueryUI] provides UI elements like a [Calendar][uidatepicker], [Accordion][uiaccordion] and [Tabs][uitabs], along with some more core functionality like [drag][uidraggable] and [drop][uidroppable].

- [Underscore]

### Prototype.js:

- [PrototypeJS]

- [Scriptaculous]

### Frameworks

- [ExtJS]

- [MooTools]

- [Dojo]

- [YUI]



[jQuery]:        http://www.jquery.com/
[jQueryUI]:      http://jqueryui.com/
[uidatepicker]:  http://jqueryui.com/demos/datepicker/
[uiaccordion]:   http://jqueryui.com/demos/accordion/
[uitabs]:        http://jqueryui.com/demos/tabs/
[uidraggable]:   http://jqueryui.com/demos/draggable/
[uidroppable]:   http://jqueryui.com/demos/droppable/
[Backbone]:      http://documentcloud.github.com/backbone/
[Underscore]:    http://documentcloud.github.com/underscore/
[PrototypeJS]:   http://prototypejs.org/
[Scriptaculous]: http://script.aculo.us/
[ExtJS]:         http://www.sencha.com/products/extjs/
[MooTools]:      http://mootools.net/
[Dojo]:          http://dojotoolkit.org/
[YUI]:           http://developer.yahoo.com/yui/