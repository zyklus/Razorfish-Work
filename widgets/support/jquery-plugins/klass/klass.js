(function( $ ){
	// Classes!
	var initializing = false;

	// The base klass implementation (does nothing)
	$.Klass = function(){};

	// Create a new klass that inherits from this class
	$.Klass.extend = function( prop, appendProp ){
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing  = true;
		var prototype = new this();
		initializing  = false;

		// move special before and after cases
		for(var name in {before:1, after:1}){
			if(!prop[name]){ continue; }

			for(var n in prop[name]){
				prop['__' + name + '-' + n] = prop[name][n];
			}

			delete prop[name];
		}

		// Copy the properties over onto the new prototype
		for( var name in prop ){
			// TODO: pass straight functions through when there is no before or after.
			//       to do this, we need to retroactively wrap protptype functions if
			//       a before or after function is in an inheriting class.

			// Check if we're overwriting an existing function
			prototype[name] = 
				typeof prop[name] == "function"
					? (function(name, fn){
						return function(){
							var before = this['__before-' + name], after = this['__after-' + name];

							before && ($.data(this, 'before-' + name) ? before = null : $.data(this, 'before-' + name, true));
							after  && ($.data(this, 'after-'  + name) ? after  = null : $.data(this, 'after-'  + name, true));

							before && before.apply(this, arguments);

							var tmp = this._super;

							// Add a new ._super() method that is the same method
							// but on the super-class
							this._super = _super[name];

							// The method only need to be bound temporarily, so we
							// remove it when we're done executing
							var ret = fn.apply(this, arguments);
							this._super = tmp;

							after && after.apply(this, arguments);

							before && ($.data(this, 'before-' + name, ''));
							after  && ($.data(this, 'after-'  + name, ''));

							return ret;
						};
					})(name, prop[name])

					: prop[name];
		}

		// Copy append properties onto the new prototype, preserving existing properties
		appendProp || ( appendProp = {} );
		for( var name in appendProp ){
			prototype[ name ] =
				// if an array
				( ( null != appendProp[name].length ) && ( appendProp[name].splice ) )
					? ( _super[ name ] || [] ).concat( appendProp[ name ] )
					: $.extend( {}, _super[ name ], appendProp[ name ] );
		}

		// The dummy class constructor
		function klass() {
			// All construction is actually done in the init method
			if(!initializing && this.init){
				this.init.apply(this, arguments);
			}
		}

		prototype.klass = {};

		// Populate our constructed prototype object
		klass.prototype = prototype;

		// Enforce the constructor to be what we expect
		klass.constructor = klass;

		// And make this class extendable
		klass.extend = arguments.callee;

		return klass;
	};

	$.Klass = $.Klass.extend({
		$property : function(name, value, event){
			var pC = name.substr(0, 1).toUpperCase() + name.substr(1),

			// back-up the existing functions, if they exist
			    set = this['set' + pC],
			    get = this['get' + pC],

			    self = this;

			// and bind the new ones
			this['set' + pC] = function(v){
				var val = set ? set.call(self, v) : v;

				if(value !== val){
					value = val;

					if(event && self.triggerAndCache){
						self.triggerAndCache(event, value);
					}
				}

				return this;
			}

			this['get' + pC] = function(){
				return get ? get.call(self, value) : value;
			}

			// call the old set function if there is a default value
			if(set && value){ set.call(self, value); }
		},

		bindMethod : function(){
			var args = [].slice.apply(arguments),
			    name = args.shift(),
			    self = this;

			return function(){
				return self[name].apply(self, args.concat( [].slice.apply(arguments) ));
			};
		}

		, deferMethod : function(){
			setTimeout( this.bindMethod.apply( this, arguments ), 1 );
		}
	});

	/**
	 * Adds a new class to the class library
	 * @param {String} namespace
	 * @param {Function} inheritsFrom
	 * @param {Object} klass Class definition
	 **/
	$.Klass.add = function( ns, toExtend, klass ){
		var path = ns.split( '.' )
		  ,   nm = path.pop()
		  ,  obj = ( function walk( root, ary ){
			var next = ary.shift();

			return (
				next
					? walk( root[ next ] || ( root[ next ] = {} ), ary )
					: root
			);
		}( $.Klass, path.slice() ) );

		klass.namespace = path.join( '.' );
		klass.klassName = nm;

		obj[ nm ] = ( toExtend || $.Klass ).extend( klass );
	};

	/**
	 * Gets a reference to a klass at the given namespace
	 * @param {String} namespace
	 * @param {String} name...
	 * @return {Function} class instance
	 * @return {undefined}
	 **/
	$.Klass.get = function( /*ns, name, name, ...*/ ){
		var path = [].slice.apply( arguments ).join( '.' ).split( '.' );

		// trim empty arguments
		for( var i=path.length-1; i>=0; i-- ){
			if( !path[i] ){ path.splice( i, 1 ); }
		}

		return ( function walk( root, ary ){
			if( !root ){ return undefined; }

			var next = ary.shift();

			return (
				next
					? walk( root[ next ], ary )
					: root
			);
		})( $.Klass, path );
	};
})( jQuery );