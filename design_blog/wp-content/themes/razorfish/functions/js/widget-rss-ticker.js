function RSSTicker( node, items ){
	this.$node  = $(node);
	this.items  = items;
	this.offset = 0;

	this.$dom1 = $('<span class="ticker-scroller"><span class="ticker-item">' + items.join('</span><span class="ticker-item">') + '</span></span>');
	this.$dom2 = this.$dom1.clone();

	this.$node.append( this.$dom1 ).append( this.$dom2 );
	25..interval( this.tick.bind( this ) );
}

RSSTicker.prototype = {
	tick : function(){
		this.scrollWidth || (this.scrollWidth = this.$dom1.width());
		this.offset++;
		this.$node.prop( 'scrollLeft',  this.offset % this.scrollWidth );
	}
};