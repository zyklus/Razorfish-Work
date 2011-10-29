( function( $ ){
	$.Klass.add( 'Survey', $.Klass.Controller, {
		init : function( config ){
			// this just calls _super with 'questions' tacked on to the existing arguments
			this._super.apply( this, [].slice.call( arguments, 0 ).concat(
				'questions', 'disableBack', 'transitionEffect'
			) );

			this.questionNum     = 0;
			this.numQuestions    = 0;
			this.currentQuestion = null;

			this.processQuestions();


			this.deferMethod( 'nextQuestion' );
		}

		/**
		 * Process question JSON and create Survey.Question instances
		 **/
		, processQuestions : function(){
			var                 q = this.questions
			  , boundSelectAnswer = this.bindMethod( 'trigger', 'selectAnswer' )
			  , i, l;

			// may do something different later. for now if we're processing the list, destroy any old one
			this.reset();

			this.aryQuestions = [];

			// init instances of `Survey.Question` klass
			for( i=0, l=q.length; i<l; i++ ){
				this.aryQuestions.push(
					new $.Klass.Survey.Question( $.extend( { questionIndex: i+1, transitionEffect : this.transitionEffect }, q[i] ) )
						.bind( 'selectAnswer', boundSelectAnswer )
				);
			}
			this.numQuestions = this.aryQuestions.length;

			return this;
		}

		/**
		 * Navigate to question via +-
		 **/
		, goQuestion : function( offset ){
			var qIx = Math.max( 1, Math.min( this.numQuestions, this.questionNum + offset ) );
			if( qIx === this.questionNum ){ return; }

			var activeQuestion = this.aryQuestions[ qIx - 1 ];

			if( this.questionNum ){
				this.currentQuestion.transitionTo( activeQuestion );
			}else{
				activeQuestion.appendTo( this.view );
			}

			this.currentQuestion = activeQuestion;
			this.questionNum     = qIx;
			this.trigger( 'changeQuestion', qIx, this.aryQuestions[ qIx-1 ] );

			return this;
		}

		, getAnswers : function(){
			var out = [];

			for( var i=0; i<this.numQuestions; i++ ){
				out.push( [ this.aryQuestions[i].answerIx, this.aryQuestions[i].answer ] );
			}

			return out;
		}

		, setAnswer : function( answer ){
			this.currentQuestion.setAnswer( answer );
		}

		, isAnswerSelected : function(){
			return !!~this.currentQuestion.getAnswer();
		}

		, prevQuestion : function(){
			return this.goQuestion( -1 );
		}

		, nextQuestion : function(){
			return this.goQuestion( 1 );
		}

		, reset : function(){
			_.invoke( this.aryQuestions || [], 'destroy' );
		}
	});
}( jQuery ) );