$(function(){
	var pullFirstPage = true
	  ,     startPage = location.search.substr( 1 ) || 'pages/index.html'  // CHANGE THIS TO STRIP ROOT PATH IF NOT USING QUERYSTRINGS
	  ,      $leftNav = $( '#left-nav' )
	  ,  $pageContent = $( '#page-content' )
	  ,     $catLinks = $( '#catalog-links' )
	  ,    linkPrefix = '?'
	  ,      catPages = {}
	  , initialLoaded = false
	  ,  commonChunks = {}
	  ,   labelChunks = {}
	  , $catalogXML;

	// set up handlers for all static pages
	$leftNav

		// add/remove hover classes
		.delegate( 'li', 'mouseenter', function(){
			$( this ).addClass( 'hover' );
		})
		.delegate( 'li', 'mouseleave', function(){
			$( this ).removeClass( 'hover' );
		})

		// add/remove `no-hover` class on parent LI nodes
		.delegate( 'li li', 'mouseenter', function(){
			$( this ).parent().closest( 'li' ).addClass( 'no-hover' );
		})
		.delegate( 'li li', 'mouseleave', function(){
			$( this ).parent().closest( 'li' ).removeClass( 'no-hover' );
		})

		// bind all existing links as XHR links
		.find( 'a' )
			.bind( 'click', clickPage );

	function initPage(){
		// pull the first page content via XHR if desired
		if( pullFirstPage && startPage ){
			addState( startPage );
		}
	}

	// page state has changed!
	History.Adapter.bind( window, 'statechange', function(){
		var state = History.getState();
		loadState( state.data.uri );
	} );

	// set active link
	function selectLink( uri ){
		console.log( uri );
		if( $leftNav.find( 'a[href="' + uri + '"]' ).length ){
			$leftNav
				.find( '.selected' )
					.removeClass( 'selected' )
					.end()
				.find( 'a[href="' + uri + '"]' )
					.closest('li' )
						.addClass( 'selected' )
						.parent()
							.closest( 'li' )
								.addClass( 'selected' );
		}
	}

	// set page content
	function setPageContent( content, immediate ){
		var $node = $( content || '<div class="content"></div>' );

		if( !$node.is( '.content' ) ){
			$node = $node.wrap( '<div class="content"></div>' ).parent();
		}

		if( immediate ){
			$pageContent.html( $node );
			return;
		}

		var $pNode = $pageContent.find( '.content' )
		  ,  width = $pageContent.width();

		$pNode.animate({ left : -width });

		$node
			.appendTo( $pageContent )
			.css     ({ left : width, position : 'absolute', width : width, top : 0 })
			.animate ({ left : 0 }, function(){
				$pNode.detach();
				$node.css({ position : 'relative', width : 'auto' });
			});

		$pageContent.css({ minHeight : $node.height() });
	}

	// adds a page state
	function addState( uri ){
		History.pushState( { uri : uri }, null, linkPrefix + uri );
		if( !initialLoaded ){
			loadState( uri );
		}
	}

	// page link was clicked on
	function clickPage( ev ){
		ev.preventDefault();

		var $this = $( this )
		  ,  link = $this.attr( 'href' );

		addState( link );
	}

	// display content from page state
	function loadState( uri ){
		var       cat = /catalog\/([^\/]+)\/?([^\/]+)?/i.exec( uri )
		  , immediate = !initialLoaded;

		initialLoaded = true;

		if( cat ){
			console.log( cat[1] );
			selectLink( 'catalog/' + cat[1] );

			if( cat[2] ){
				navToCatPage( cat[2], createCatSubPage, immediate );
			}else{
				navToCatPage( cat[1], createCatIndexPage, immediate );
			}
		} else {
			loadPage( uri, immediate );
		}
	}

	// load a page via XHR
	function loadPage( link, immediate ){
		$.get( link, function( data ){
			var $data = $( '<div></div>' ).html( data );
			selectLink( link );

			setPageContent( $data.html(), immediate );
			var title = $data.find( 'title' ).text();
		
			if( title ){ document.title = title; }
		} );
	}

	/*********************
	 * Parse Catalog XML *
	 *********************/
	// pull in the catalog xml
	$.ajax({
		  url      : 'xml/activities_catalog.xml'
		, success  : function( data ){
			$catalogXML = $( data );
			addCatalogLinks();
		}
		, error    : function(){
			console && console.log( 'Error parsing XML' );
		}
		, dataType : 'xml'
	});

	// add catalog links to the side menu
	function addCatalogLinks(){
		$catalogXML.find( 'activity_category category' ).each( function(){
			var $this = $( this );

			$catLinks.append( $( '<li><a href="catalog/' + $this.text().toLowerCase().replace( / /g, '_' ) + '">' + $this.text() + '</a></li>' )
			 	.find( 'a' )
					.bind( 'click', clickCatLink )
					.data( 'cat-id', $this.attr( 'id' ) )
					.end()
			);
		} );

		$catalogXML.find( 'common_content_chunks common_content' ).each( function( ix, data ){
			var $data = $( data );
			commonChunks[ $data.attr( 'id' ) ] = $data.text();
		} );
		$catalogXML.find( 'label_chunks label' ).each( function( ix, data ){
			var $data = $( data );
			labelChunks[ $data.attr( 'id' ) ] = $data.text();
		} );

		// nav done loading, load the page
		initPage();
	}

	// if necessary, render category page
	// navigate to said page
	function navToCatPage( id, renderer, immediate ){
		if( !catPages[ id ] ){
			catPages[ id ] = renderer( id );
		}

		setPageContent( catPages[ id ], immediate );
	}

	// show a catagory
	function clickCatLink( ev ){
		ev.preventDefault();

		var $this = $( this )
		  ,    id = $this.data( 'cat-id' )
		  ,  link = 'catalog/' + id;

		addState( link );
	}

	// create category page with just a bunch of links
	function createCatIndexPage( id ){
		var   title = $catalogXML.find( 'activity_category category[id="' + id + '"]' ).text()
		  ,   $list = $catalogXML.find( 'activity_type activity[category="' + id + '"]' )
		  ,   $node = $( '<div class="category-index"><h3>' + title + '</h3><ul class="nav"></ul><ul class="nav"></ul></div>' )
		  ,    $ul1 = $node.find( 'ul.nav:eq(0)' )
		  ,    $ul2 = $node.find( 'ul.nav:eq(1)' )
		  , pageTxt = $catalogXML.find( 'page_content page[id="' + id + '"]' );

		if( pageTxt ){
			processPageTxt( pageTxt.text() ).insertBefore( $ul1 );
		}

		$list.each( function( ix, node ){
			// ignore odd items
			if( 1&ix ){ return; }

			$ul1.append( $( '<li>' + $( node ).text() + '</li>' ).data( 'node', node ) );
		} );

		$list.each( function( ix, node ){
			// ignore odd items
			if( !( 1&ix ) ){ return; }

			$ul2.append( $( '<li>' + $( node ).text() + '</li>' ).data( 'node', node ) );
		} );

		$node.delegate( 'li', 'click', function(){
			addState( 'catalog/' + id + '/' + $( this ).data( 'node' ).getAttribute( 'id' ) );
		} );

		return $node;
	}

	/***************************************
	 * Render an HTML page from XML chunks *
	 ***************************************/

	// create category content page
	function createCatSubPage( id ){
		var chunks = $catalogXML.find( 'content_chunks content[activity="' + id + '"]' );

		return generatePageContent( chunks, labelChunks );
	}

	// parse page for sub-data, sections, etc.
	function processPageTxt( txt ){
		var chunkRx = /\[\[([^\]]+)\]\]/gm
		  ,  sectRx = /<section>[^<]*<h4>([^<]+)<\/h4>(.*?)<\/section>/gm
		  , chunk, $node;

		// strip new-lines (regex's don't like some of them)
		txt = txt.replace( /\n|\r/g, ' ' );

		// replace [[id]] with common content chunk
		while( chunk = chunkRx.exec( txt ) ){
			txt = txt.replace( chunk[0], commonChunks[ chunk[1] ] || '' );
		}

		// parse <section><h4>...</h4>...</section>
		while( chunk = sectRx.exec( txt ) ){
			txt = txt.replace( chunk[0], '<div class="section"><h4>' + chunk[1] + '</h4><div class="content">' + chunk[2] + '</div></div>' );
		}

		$node = $( '<div>' + txt + '</div>' );

		$node.delegate( '.section h4', 'click', function(){
			var    $this = $( this ).closest( '.section' )
			  , $content = $this.find( '.content' );

			if( $content.is( ':visible' ) ){
				$content.slideUp( function(){
					$this.removeClass( 'expanded' );
				} );
			}else{
				$this.addClass( 'expanded' )
				$content.slideDown();
			}
		} );

		return $node;
	}

	// map chunks and content
	function generatePageContent( chunks, titles ){
		return processPageTxt( chunks.map( function( ix, chunk ){
			var $chunk = $( chunk )
			  ,    out = ''
			  , title;

			out += '<section>';

			if( titles ){
				title = titles[ $chunk.attr( 'id' ) ];

				if( title ){
					out += '<h4>' + title + '</h4>'
				}
			}

			out += $chunk.text();
			out += '</section>';
			
			return out;
		} ).get().join( '' ) );
	}
});