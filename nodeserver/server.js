var fs = require('fs');

var queue = require('express-queue');
var express = require('express');
var connect = require('connect');
var multer = require('multer');
var PythonShell = require('python-shell');
var pathF = require('path');

var namer = require('color-namer')
var color   = require('dominant-color');

var textract = require('textract');

var index = 0;
var app = express();
var upload = multer(
    {
        limits: {
            fieldNameSize: 999999999,
            fieldSize: 999999999
        },
        dest: '/' 
    });

app.use('/upload', queue({activeLimit : 10}));
app.use(require('connect-logger')({/* options */}));//app.use(connect.logger('dev'));
app.get('/', function(req, res){
    res.send(
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="source">'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
});

app.post('/upload', upload.any(), function(req, res){
    index++;
    //console.log(req.files);

    var tmp_path = req.files[0].path;
    var target_path = './' + req.files[0].originalname;
    
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    //console.log(index + ' saved file : ' + target_path)
    var options = {mode: 'text',pythonPath: '',pythonOptions: ['-u'],
                   scriptPath: '',args: [target_path]};
    var result = {'num' : 0, 'path' : req.files[0].fieldname};
    var ext = pathF.extname(req.files[0].originalname);
    PythonShell.run('ML.py',options, function(err, results){
        if(err){
	    res.json({'error': 'error'});
	    console.log(err) 
        }else {
	    //console.log(results);
	    result['tag'+result['num']] = results[0];
	    result['probability' + result['num']] = results[1];
	    result['num']++;
	}
	color(target_path, function(err, color){
	    //console.log(namer('#'+color).basic)
	    if(err){
	        console.log(err);
	    }
	    else{
	        result['tag'+result['num']] = (namer('#'+color).basic)[0].name;
	        result['num']++;
	    }
	    console.log("color done")
	    textract.fromFileWithPath(target_path, function(error,text){
	        if(err){
		    console.log(err);
	        }
	        else{
        	    //console.log(text)
        	    var a = new String(text).trim()
		    if(a.length != 0){
			result['tag'+result['num']] = a;
			result['num']++;
		    }
		    else{
			//console.log("no text")
		    }
	        }
    	        res.json(result);
	        fs.unlink(target_path, function (err){
        	    if (err) console.log(err + ' : ' + target_path);
        	    //else console.log('successfully deleted');
      	        });
      	        fs.unlink(tmp_path, function (err){
                    if (err) console.log(err + ' : ' + tmp_path);
        	    //else console.log('successfully deleted');
      	        });
    	        //console.log("done");
	    });
        });
    });
});

app.get('/info', function(req, res){
    console.log(__dirname);
    res.send("image upload server: post /upload");
});

app.get('/:file', function (req, res){
        file = req.params.file;
        var dirname = "/tmp/test/";
        var img = fs.readFileSync(dirname + file);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');

});



app.listen(8080);
console.log('started server on localhost...');
