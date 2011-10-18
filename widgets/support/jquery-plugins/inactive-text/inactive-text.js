/**
 * jQuery inactiveText (version 1.01)
 *
 * Author  : Mark Kahn
 * License : Public Domain (Do whatever you want with this)
 */
(function ( $ ) {
	/**
	 * Sets the text value of a cell to an default value when the user has not yet entered anything
	 * @class
	 * @requires jQuery
	 * @name jQuery.inactiveText
	 * @param {String} inactiveClass Classname when inactive
	 * @param {String} defaultValue  Text to show when inactive
	 */
	$.fn.inactiveText = function (inactiveClass, defaultValue) {
		var a, b;
		this
            .data('defaultValue', defaultValue)
            .addClass('inactive')
            .focus(a = function () {
            	var $this = $(this);
            	if ($this.hasClass(inactiveClass)) {
            		(valFn.apply($this) == defaultValue) && $this.val('');
            		(valFn.apply($this) != defaultValue) && $this.removeClass(inactiveClass);
            	}
            })
            .blur(b = function () {
            	var $this = $(this);
            	this.value || $this.addClass(inactiveClass).val(defaultValue);
            });
		this.each(a);
		this.each(b);

		this.setDefaultValue = function (d) {
			this.each(a);
			defaultValue = d;
			this.each(b);
		};

		return this;
	};

	var valFn = $.fn.val;

	$.fn.val = function (v) {
		if (typeof (v) == 'undefined') {
			var val = valFn.apply(this, arguments);
			return val == this.data('defaultValue') ? '' : val;
		}

		return valFn.apply(this, arguments);
	};
})( jQuery );