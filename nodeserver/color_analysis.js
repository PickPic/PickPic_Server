var a = require("jimp");
var convert = require('color-convert');
var arr = new Array(360);
for(var i = 0; i<360; i++){
	arr[i] = 0;
}
a.read("./imagenet/2.jpg", function(err, image){
	image.resize(256, 256).write("a.jpg");

	for(var i = 0; i<256; i++){
		for(var j = 0; j <256; j++){
			var a = convert.hex.hsl(image.getPixelColor(i,j))[0];
			arr[a]++;
		}
	}
	var a = 0;
	for(var i = 0; i<360; i++){
		if(arr[a] < arr[i]){
			a = i;
		}
	}
	console.log("done : " + a + " " + arr[a]);
});

