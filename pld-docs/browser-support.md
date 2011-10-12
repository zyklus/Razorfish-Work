# Browser Support

The current list (as of this writing) of common browsers to be tested includes:

- Internet Explorer 7, 8, 9, 10 (Soon, not yet released) and 6 if necessary.
- Google Chrome (Due to Chrome's self-update behavior, only the newest version generally needs to be tested)
- Firefox 3.6 & newest (7.0 as of this writing).  The reason for the gap is that FireFox has recently changed it's release cycle.  3.6 is still a fairly recent version and the numbers after that have less of a rendering impact and are geared more towards new browser features.
- Safari (newest version)
- Opera (Rarely tested, but is the only other browser with any real market share, around 2%)

## General Techniques for good cross-browser code

It is inevitable that browser-specific code will eventually need to be written, but there are a few ways to minimize the impact and possible issues that such code has or causes.

### JavaScript

___Never___ use browser-detection in JavaScript to branch code.  Use _feature detection_ instead.  The difference between these two is most easily explained using an example:

    // bad
    if( isIE6 ){
        document.getElementsByClassName = function(){ ... }
    }

    // good
    if( !document.getElementsByClassName ){
        document.getElementsByClassName = function(){ ... }
    }

Most common JavaScript libraries take care of most of this functionality for you, but in cases where you need to add core functionality, keep this in mind.

### CSS

Although there are a slew of browser-specific CSS hacks out there, they take advantage of obscure browser rendering problems, and are often impossible to read ( or figure out which browser they are supposed to be targeting ) without proper code comments.

Because of this, and because most of the CSS hacks are often targeted at a single version of a single browser anyway, browser detection is actually suggested here.  Using JavaScript (or via server-side code) add appropriate class names to your `html` or `body` element:

    <html class="IE v6 v6_2 lt7 lt8 lt9">

The `v6_2`, `lt7`, `lt8`, `lt9` classes are optional, but may make development easier.  Your general CSS code for a browser-specific patch then looks like:

    .IE.v6 { ... }
    .FF.v3 { ... }
    .Chrome { ... }


## IE6

_Internet Explorer 6_ is the bane of many developer's lives.  There are more bugs and inconsistencies in this browser than in every other browser on the above list put together, so often a very large chunk of the debugging time and effort go into supporting this browser.  Since current stats show the IE6 market share to be _below 2%_, it is suggested to ignore or at least de-prioritize this browser unless there is a specific need to support it.

A few of the common IE6 pit-falls:

- PNG-24 transparency does not work.  There is a script called the [PNG htc fix] that cures this issue in many (but usually not all) circumstances.  The version linked is one of many available.

- `hasLayout` is the cause of many IE6 rendering issues.  You can google the issue in detail (there are thousands of pages on the topic), but if something is displaying in an odd way on your page, try triggering `hasLayout` by adding one of the many fixes to the CSS for that element, such as `height: 1%` or `zoom: 1`.

- IE6, in quirks mode, has a box model that is different than every other browser (though in this author's opinion it actually makes more sense, a moot point).  To prevent this, make sure you include a doctype that triggers standards mode such as the HTML5 doctype `<!DOCTYPE html>`

- The Z-Index problem: Every browser other than IE6 layers items with a z-index the same way.  IE6 does things differently.  To properly explain this, we must first explain something called _stacking context_.  Items that have a z-index are only stacked relative to the first parent element with a _stacking context_.  Most browsers define something to start a new _stacking context_ if it meets one of the following conditions:
    - It has `position` set to anything other than `static` __and__ it has a `z-index` set.
    - `opacity` < 1

    IE6 adds to this the condition that any element with `position` set creates a _stacking context_ regardless of whether or not it also has a `z-index` set.

    A good work-around to this is to manually (or via a CSS template) add `z-index:1` to ___every___ element that has `position` set.  This will cause all browsers to behave the same way that IE6 behaves, thus reducing your cross-browser testing.

- A long list of [more fixes] is available.

[png htc fix]: http://www.twinhelix.com/css/iepngfix/
[more fixes]: http://www.virtuosimedia.com/dev/css/ultimate-ie6-cheatsheet-how-to-fix-25-internet-explorer-6-bugs