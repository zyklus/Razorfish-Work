# Templates

Using template languages for HTML & CSS (and potentially JS) development can greatly speed up development time.  This is simply an outline of some of the commonly available templating engines.  All templating engines require a pre-processor to convert template code into `.html`, `.css` or `.js` files.

Although using templates requires a bit more up-front development effort, in the long run the development time can be greatly shortened.

## HTML Template Engines

- [Jade] - A personal favorite, simplifies HTML down to an easy-to-read tree.  Allows includes, variables, etc.  Eample `jade` code for the navigation on this page:

        !!! 5
        html
            head
                link(href='site.css', rel='stylesheet', type='text/css')
            body
                #navigation
                    li
                        a(href='index.html') Home
                    li
                        a(href='browser-support.html') Browser Support
                    li
                        a(href='browser.html') Browser Best Practices
                    ...

- [Haml] - Similar syntax to Jade, not quite as powerful as it was developed first, but more widely supported.
- [Markdown] - Very powerful for writing documentation / blogs (These docs are built using Markdown), but not for much else.  It is gaining traction very quickly, and there are renderers available in many languages.

## CSS Template Engines

There are numerous CSS templating engines out there, a few of which include

- [Stylus] A personal favorite, but new and has limited support.  Compilers currently exist in `node.js` and `ruby`.  Example `styl` code for the navigation on this page:

        #navigation
            position      fixed
            top           0px
            right         10px
            border        1px solid #CCC
            padding       10px
            border-radius 0 0 5px 5px
            border-top    0px
            background    #EEE

            li
                list-style-type none
        
                a
                    color           #000
                    text-decoration none
        
                    &:hover
                        text-decoration underline
- [SCSS / SASS][SCSS] - Many of the same features as `Stylus`.  Not quite as well thought out, as it was developed first, but much better support.
- [Less CSS][lesscss] - One of the first modern CSS templating engines, has a more confusing syntax than the previous two but is still very powerful.  A [.Net Plugin][lessnet] is available.

## JS Template Engines
### CoffeeScript
http://jashkenas.github.com/coffee-script/

CoffeeScript is gaining a lot of traction in the development community.  It boasts a shorter, simplier syntax than traditional JavaScript and a shallower learning curve.  In my personal opinion, it acts as a crutch to prevent developers from learning the ins-and-outs of JavaScript, but then again I am not the target audience.  If you use it, the only real caveat is that since JavaScript code is generated and run in the browser, your developers will be debugging different code than they wrote.

[stylus]:   http://learnboost.github.com/stylus/docs/selectors.html
[jade]:     http://jade-lang.com
[haml]:     http://haml-lang.com
[scss]:     http://sass-lang.com
[lesscss]:  http://lesscss.org/
[lessnet]:  http://www.dotlesscss.org/
[markdown]: http://daringfireball.net/projects/markdown/