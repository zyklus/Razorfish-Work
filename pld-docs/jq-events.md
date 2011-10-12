# jQuery Events

jQuery provides handy hooks into all browser events.  In order to watch for a `click` on an element, for example:

    $( '.element' ).bind( 'click', function(){
        // handle click here
    }

You can listen for _any_ type of event using `.bind`.  Common events like `click`, `mouseover`, `hover` also have direct aliases:

    $( '.element' ).click( function(){
        ...
    } )

## Listening for an event on many similar elements

Often times you have many element that have the same general logic on an event, e.g. many `li` elements in a `ul`.  You may want to change the class name of these elements on `hover`, for example.  You can, of course, write the following:

    $( 'ul#someUL li' ).hover( function(){
        // handle hover
    }, function(){
        // handle hover out
    });

But if you do so you will have a different event attached to every single `LI` node.  There are two down-sides to this:

1. Having too many events on the page can slow down the browser
2. If you later add more `LI` tags via JavaScript, perhaps as the result of an AJAX call, you have to also be sure to add event handlers for each of these new tags.

The reccomended approach in this case, and in nearly every case that involves the same event on multiple elements, is to use jQuery's `.live` or `.delegate` functions:

    $( `ul#someUL li' ).live( 'hover', ... )

    $( `ul#someUL` ).delegate( 'li', 'hover', ... );

Both of these events do functionally the same thing: They attach themselves to a higher element on the page and due to a concept called _event bubbling_, they wait for the event on the `LI` to reach that higher element.  There is only one event attached to the page and any new `LI`'s added to the page will automatically invoke this `hover` handler.

There is a difference in these two cases:

- `.delegate` attaches the event to the object in the first selector, in this case the `ul#someUL` element.  This should almost always be used unless there is no common parent selector (e.g. in cases like observing clicks on every `a` tag in a page).
- `.live` attaches to the `body` of the page.  Because of this, the jQuery code that validates whether the handler should be triggered is run more often than with `.delegate`, ending up with more wasted resources.

## Using jQuery's `.data` functionality

In many circumstances it can be useful to have more information about what item was clicked on.  When using `.bind`, this information can be bound in a JavaScript _closure_, but this is not the case with `.delegate` and `.live`.  If you need to attach information about the JavaScript element associated with the HTML element, you can use jQuery's `.data` functionality:

    var $ul = $( '#someUL' );
    
    for( var i=0, l=items.length; i<l; i++ ){
        $ul.append(
            $( '<li>' + items[i].name + '</li>' )
                .data( 'item', items[i] )
        );
    }

    $ul.delegate( 'li', 'click', function(){
        // the same item that was attached above
        var item = $( ev.target ).data( 'item' );

        // do stuff with item
    });