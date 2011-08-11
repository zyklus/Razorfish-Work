$(function(){
	var $canvas = $('<canvas width="1" height="1"></canvas>'),
			ctx = $canvas[0].getContext('2d'),
		  $cont = $('.fish-school'),
	 generators = [],
		bubbles = [],
		  yStep = 2,
		 w, h, imgData, pixels;

	$cont.append($canvas);
//	$(window).bind('resize', onResize);
	onResize();

	1..times(createBubbleGenerator);
	50..interval(drawBubbles);

	function drawBubbles(){
		ctx.clearRect(0, 0, w, h);

		var newBubbles = [],
			x, y, i, j, m, imgData, offset;

		for(var i=0, l=generators.length; i<l; i++){
			for(var j=0, m=0|Math.random()*6; j<m; j++){
				newBubbles.push( 0|generators[i] + j );
			}
			generators[i] = Math.max(20, Math.min(w-20, generators[i] + Math.random()*4 - 2));
		}

		bubbles.unshift(newBubbles);

		ctx.beginPath();
		for(i=0; i<bubbles.length; i++){
			y = h - i*2;

			if(y<0){
				bubbles.splice(i);
				break;
			}

			for(j=bubbles[i].length-1; j>=0; j--){
				if(Math.random() < .05){
					bubbles[i].splice(j, 1);
					continue;
				}

				x = 0|(bubbles[i][j] += Math.random() * 6 - 3);

				ctx.moveTo(x, y);
				ctx.lineTo(x+1, y+1);
			}
		}
		ctx.stroke();
	}

	function createBubbleGenerator(){
		generators.push(0|Math.random() * w);
	}

	function onResize(){
		w = $cont.width();
		h = $cont.height();

		$canvas.attr('width', w).attr('height', h);
		ctx.strokeStyle = '#606166';
	}
});