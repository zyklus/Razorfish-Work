(function( $ ){
	$.Klass.add( 'Survey.Question', $.Klass.MVC.Controller, {
		init : function( config ){
			// this just calls _super with options tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'question', 'answers', 'questionIndex', 'transitionEffect'
			) );

			this.view.setQuestion( this.question );
			this.view.setAnswers ( this.answers  );

			this.model.bind( 'set:answer', this.bindMethod( 'onAnswerChange' ) );
		}

		, selectAnswer : function selectAnswer( ix ){
			this.answerIx = ix;
			this.setAnswer( ix );

			this.trigger( 'selectAnswer', ix, this.answer );
		}

		, getAnswer : function getAnswer(){
			return this.model.answer;
		}

		, setAnswer : function setAnswer( answer ){
			this.model.set({ answer: answer });
		}

		, onAnswerChange : function( answer ){
			this.view.setAnswer( answer );
		}

		, transitionTo : function( question ){
			this.view.transitionTo(
				  question.view.$domNode
				, this.transitionEffect || ( question.questionIndex > this.questionIndex ? 'iOSScrollLeft' : 'iOSScrollRight' )
			);
		}
	});
})( jQuery );