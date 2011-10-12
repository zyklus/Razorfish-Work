# jQuery

[jQuery] has quickly become the de facto standard for general cross-browser JavaScript development.  It is the reccomended library for all development unless you need/want something more structured (see the [libraries] page)

## General Best Practices

### Cache elements

Code like the following is all too common:

    $( '.some_class' ).click    ( ... );
    $( '.some_class' ).mouseover( ... );
    $( '.some_class' ).mouseout ( ... );

The problem with this is that the `$( '.some_class' )` selector is run multiple times.  If this selector happens to be longer and slower, this can cause your code to slow down.  Cache the jQuery object instead:

    var $someClass = $( '.some_class' );

    $someClass.click    ( ... );
    $someClass.mouseover( ... );
    $someClass.mouseout ( ... );

### Chaining

And while you're at it, you can simplify the above code to:

    var $someClass = $( '.some_class' );

    $someClass
        .click    ( ... )
        .mouseover( ... )
        .mouseout ( ... );

[jQuery]: http://www.jquery.com
[libraries]: js-libraries.html