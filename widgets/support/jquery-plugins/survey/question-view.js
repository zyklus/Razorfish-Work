(function( $ ){
	$.Klass.add( 'Survey.Question.View', $.Klass.View, {
		init : function( config ){
			this._super.apply( this, arguments );

			this.$questionNode = $( '<div class="question-title"></div>' ).appendTo( this.$domNode );
			this.$answersNode  = $( '<ul class="question-answers"></ul>' ).appendTo( this.$domNode );
		}

		, setQuestion : function( question ){
			this.$questionNode.text( question );
		}

		, setAnswers : function( answers ){
			var self = this;

			this.$answersNode.empty();

			$( answers ).each( function( ix, a ){
				self.$answersNode.append(
					$( '<li><span class="question-radio-wrapper"><input type="radio" name="radio-' + self.guid + '"></span><span class="question-answer-text">' + a + '</span></li>' )
						.bind( 'click', self.bindMethod( 'selectRadio', ix ) )
				);
			} );
		}

		, setAnswer : function setAnswer( answerIx ){
			this.$answersNode.find( 'li.selected' ).removeClass( 'selected' );
			if( !~answerIx ){ return; }

			this.$answersNode
				.find( 'li:eq(' + answerIx + ')' )
					.addClass( 'selected' )
					.find    ( 'input' )
						.prop( 'checked', true );
		}

		, selectRadio: function selectRadio( ix, ev ){
			this.$answersNode.find( 'li.selected' ).removeClass( 'selected' );
			this.controller.selectAnswer( ix );
		}

		, transitionTo : function( node, effect ){
			this.$domNode.transitionTo( node, effect );
		}
	});
})( jQuery );