/***********************
 * Reads a config file *
 ***********************/

(function( $ ){
	$.Klass.add( 'File.ConfigReader', $.Klass.File.Dependency, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'lineExpressions' );

			this.bindEvents(
				  'set:lineExpressions', 'parseLineExpressions'
				, 'set:fileData'       , 'dataReady'
			);
		}

		, parseLineExpressions : function parseLineExpressions( exprs ){
			var self = this
			  , i, l;

			for( i=0, l=exprs.length; i<l; i++ ){
				// convert first arg to a regex
				if( 'string' === typeof( exprs[i][0] ) ){
					exprs[i][0] = new RegExp( '^' + exprs[i][0] + '\\s(.*)' );
				}

				// convert 2nd arg to a function
				if( 'string' === typeof( exprs[i][1] ) ){
					// fn is a setter
					exprs[i][1] = ~exprs[i][1].indexOf( ':' )
						? this.bindMethod( 'set', exprs[i][1].substr( exprs[i][1].indexOf( ':' ) + 1 ) )
						: this.bindMethod( exprs[i][1] );
				}
			}
		}

		// fn only exists so that it can be replaced if desired
		, dataReady : function dataReady(){
			this.trigger( 'data:ready', this.fileData );
			this.readConfigData();
		}

		, readConfigData : function readConfigData(){
			var lines = this.getLines()
			  , exprs = this.lineExpressions
			  , i, l, j, m, data;

			lineLoop:for( i=0, l=lines.length; i<l; i++ ){
				for( j=0, m=exprs.length; j<m; j++ ){
					if( data = exprs[j][0].exec( lines[i] ) ){
						exprs[j][1]( data[1] );

						continue lineLoop;
					}
				}
			}

			this.trigger( 'data:processed' );
		}
	} );
}( jQuery ));