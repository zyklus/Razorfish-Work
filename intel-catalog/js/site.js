$(function(){
	var pullFirstPage = true
	  ,     startPage = location.search.substr( 1 ) || 'pages/index.html'  // CHANGE THIS TO STRIP ROOT PATH IF NOT USING QUERYSTRINGS
	  ,      $leftNav = $( '#left-nav' )
	  ,  $pageContent = $( '#page-content' )
	  ,    linkPrefix = '?';

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

	if( pullFirstPage && startPage ){
		if( $leftNav.find( 'a[href="' + startPage + '"]' ).length ){
			loadPage( startPage, true );
		}
	}

	// page state has changed!
	History.Adapter.bind( window, 'statechange', function(){
		var state = History.getState();
		loadPage( state.data.uri );
	} );

	// set active link
	function selectLink( uri ){
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
		if( immediate ){
			$pageContent.html( content );
			return;
		}

		var  $node = $( content || '<div class="content"></div>' )
		  , $pNode = $pageContent.find( '.content' )
		  ,  width = $pageContent.width();

		$pNode.animate({ left : -width });

		$node
			.appendTo( $pageContent )
			.css     ({ left : width, position : 'absolute', width : width, top : 0 })
			.animate ({ left : 0 }, function(){
				$pNode.remove();
				$node.css({ position : 'relative', width : 'auto' });
			});

		$pageContent.css({ minHeight : $node.height() });
	}

	// page link was clicked on
	function clickPage( ev ){
		ev.preventDefault();

		var $this = $( this )
		  ,  link = $this.attr( 'href' );

		History.pushState({ uri : link }, null, linkPrefix + link);
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

	// swipe the content node to its new content
	function switchToContent( data, direction ){
		console.log( direction );
	}
});