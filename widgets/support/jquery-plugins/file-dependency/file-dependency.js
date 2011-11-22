/***************************************************************
 * Meant to be extended, simply a root class that loads a file *
 ***************************************************************/

(function( $ ){
	$.Klass.add( 'File.Dependency', $.Klass.Configurable, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'file', 'fileData', 'lineComment' );

			this.bindEvents(
				'set:file', 'setFile'
			);
		}

		, setFile : function setFile( path ){
			var self = this;

			$.get( path, function( contents ){
				self.set( 'fileData', contents );
			} );
		}

		, getLines : function getLines(){
			var data = this.fileData;

			if( this.lineComment ){
				data = data.replace( new RegExp( this.lineComment + '.*', 'g' ), '' );
			}

			data = data
				.replace( /\s*[\n\r]+|[\n\r]+\s*/gm, '\n' ) // remove whitespace & multiple empty lines
				.replace( /^\n|\n$/gm, '' )                 // remove leading & trailing line-breaks
				.split  ( '\n' );

			return data;
		}
	} );
}( jQuery ));