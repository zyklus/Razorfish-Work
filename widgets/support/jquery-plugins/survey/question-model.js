(function( $ ){
	$.Klass.add( 'Survey.Question.Model', $.Klass.Model, {
		init : function( config ){
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'answer'
			) );
		}
	});
})( jQuery );