$.Util.Normals = {};

// this is basically where the magic happens
$.Util.Normals.drawLight = function(canvas, ctx, normals, textureData, shiny, specularity, lx, ly, lz) {
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
    var i = 0;
    var ni = 0;
    var dx = 0, dy = 0, dz = 0;
    var magInv, dot, intensity, t1, t2, t3;
    for(var y = 0; y < canvas.height; y++) {
        for(var x = 0; x < canvas.width; x++) {
            // make it a bit faster by only updating the direction
            // for every other pixel
            if(shiny > 0 || (ni&1) == 0){
                // calculate the light direction vector
                dx = lx - x;
                dy = ly - y;
                dz = lz;

                // normalize it
                magInv = 1.0/sqrt(dx*dx + dy*dy + dz*dz);
                dx *= magInv;
                dy *= magInv;
                dz *= magInv;
            }
            // take the dot product of the direction and the normal
            // to get the amount of specularity
            dot = dx*normals[ni] + dy*normals[ni+1] + dz*normals[ni+2];
            // spec + ambient
            intensity = pow(dot, 20)*specularity+pow(dot, 400)*shiny + 0.5;
	    t1 = textureData[i]*intensity;
	    t2 = textureData[i+1]*intensity;
            t3 = textureData[i+2]*intensity;
	    //update all 3 channels
	    data[i] = (t1 < 0) ? 0 : ((t1 > 255) ? 254: t1);
	    data[i+1] = (t2 < 0) ? 0 : ((t2 > 255) ? 254: t2);
            data[i+2] = (t3 < 0) ? 0 : ((t3 > 255) ? 254: t3);
            i += 4;
            ni += 3;
        }
    }
    ctx.putImageData(imgData, 0, 0);
};


$.Util.Normals.normalmap = function( canvasId, texture, normalmap, cb ){
    var canvas = document.getElementById(canvasId);
    if(canvas.getContext == undefined) {
        document.write('unsupported browser');
        return;
    }

    var ctx = canvas.getContext('2d');

    var normalData = null;
    var textureData = null;

    function getDataFromImage(img) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, img.width, img.height);
        ctx.drawImage(img, 0 ,0);
        return ctx.getImageData(0, 0, img.width, img.height);
    }

    function loadImage(src, callback) {
        var img = document.createElement('img');
        img.onload = callback;
        img.src = src;
        return img;
    }

    var normals = [];
    var textureData = null;
    var normalsImg = loadImage(normalmap, function() {
        var data = getDataFromImage(normalsImg).data;
        // precalculate the normals
        var nx, ny, nz, magInv;
        var max = canvas.height*canvas.width*4;
		var sqrt = Math.sqrt;

        for(var i = 0; i < max; i+=4) {
            nx = data[i];
            // flip the y value
            ny = 255-data[i+1];
            nz = data[i+2];

            // normalize
            magInv = 1.0/sqrt(nx*nx + ny*ny + nz*nz);
            nx *= magInv;
            ny *= magInv;
            nz *= magInv;

            normals.push(nx);
            normals.push(ny);
            normals.push(nz);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var textureImg = loadImage(texture, function() {
            textureData = getDataFromImage(textureImg).data;

			cb( { canvas: canvas, ctx: ctx, normals: normals, textureData: textureData } );
        });

    });

    // function main() {
    //     canvas.onmousemove = function(e) {
    //         drawLight(canvas, ctx, normals, textureData, shiny, specularity, e.clientX+50, e.clientY+50, 300);
    //     }
    // }
};
