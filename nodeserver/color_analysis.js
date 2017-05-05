var a = require("jimp");
var convert = require('color-convert');

a.read("./imagenet/1.jpg", function(err, image){
	image.resize(250, 250);
	for(var i = 0; i<250; i++){
		for(var j = 0; j <250; j++){
			console.log((convert.hex.hsl(image.getPixelColor(i,j))[0]));
		}
	}
});
