/***************************************************************
 * Meant to be extended, simply a root class that loads a file *
 ***************************************************************/

(function( $ ){
	$.Klass.add( 'File.Dependency', $.Klass.Configurable, {
		init : function init( config ){
			this._super.apply( this, arguments );
			this.addConfigParameters( 'path', 'fileData', 'lineComment' );

			this.bindEvents(
				'set:file', 'setFile'
			);
		}

		, setFile : function setFile( path ){
			var self = this;

			$.get( path, function( contents ){
				this.set( 'fileData', contents );
			} );
		}

		, getLines : function getLines(){
			var data = this.data;

			if( this.lineComment ){
				data = data.replace( new RegExp( this.lineComment + '.*', 'g' ), '' );
			}

			data = data.split( /[\\n\\r]+/ );

			return data;
		}
	} );
}( jQuery ));