# CSS Structure

Keeping CSS structured and organized is always a headache and requires self discipline to keep your files from becoming an un-managable mess.  This document will provide some general tips to help you, however.

### Templates

The best tool I've found to keep CSS organized is, put simply, to not use CSS.  I find that with a template language that compiles down to CSS, that has proper nesting & includes, structure becomes much easier to organize:

    widget-boder-color      = red
    widget-background-color = blue
    widget-title-size       = 18px
    widget-title-color      = teal
    
    .widget
        border     widget-border-color
        background widget-background-color
    
        .titlebar
            font-size  widget-title-size
            background widget-title-color
    
        &:hover .titlebar
            background darken( widget-title-color, 50% )

can get rendered into:

    .widget {
        border     : widget-border-color;
        background : #00f;
    }
    .widget .titlebar {
        font-size  : 18px;
        background : #008080;
    }
    .widget:hover .titlebar {
        background : #004040;
    }

Obviously this is a simplistic example, but the organizational benefits of such a template language should be clear.

### Indentation

Without using a templating language, a useful tool to keep CSS organized is to still indent code.  Taking the above example:

    .widget {
        border     : widget-border-color;
        background : #00f;
    }
        .widget .titlebar {
            font-size  : 18px;
            background : #008080;
        }
        .widget:hover .titlebar {
            background : #004040;
        }

It is clear that the 2nd & 3rd rules are directly related to the 1st.

### Organization by HTML Structure

One of the most common ways to organize CSS is by feature.  It is helpful to add large block comments to your CSS code so that it is perfectly clear where code belongs:

    /*********************
     * HEADER NAVIGATION *
     *********************/
    .header ul li {
        float           : left;
        list-style-type : none;
        padding         : 0 10px;
    }
    .header .homeLink {
        background : url( /images/logo.png );
    }

    /***********
     * Widgets *
     ***********/
    .widget {
        background-color : blue;
    }

    /******************
     * Weather Widget *
     ******************/
    .widget.weather {
        min-width : 200px;
    }

    .widget.weather .title {
        background-image : url( /images/weather.png );
    }

### Organization by CSS Feature

Another, although somewhat less commmon, approach is to organize your CSS by specific design aspects, e.g.:

    /**********
     * Layout *
     **********
    .title { width : 100%; height : 100px; }
    .widget { min-width : 200px; min-height : 200px; }
    .widget.weather { min-width : 300px; }

    /**************
     * Typography *
     **************/
    html { font-family: verdana; }
    .widget { font-family: tahoma; }
    .widget.title { font-size: 18px; }

    /**********
     * Colors *
     **********/

### Breaking CSS Files Apart

A very good approach for organizing CSS is to place separate funtionality in entirely separate files.

__Note:__ This approach should only seriously be used if there is a build process that stitches these files back together as it can increase page load time.

Most template languages have this feature built in as well.

    @import url( reset.css )
    @import url( top-nav.css )
    @import url( left-nav.css )
    @import url( widget.css )
    @import url( weather-widget.css )