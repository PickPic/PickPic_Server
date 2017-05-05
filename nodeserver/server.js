var fs = require('fs');

var express = require('express');
var connect = require('connect');
var multer = require('multer');
var PythonShell = require('python-shell');

var app = express();
var upload = multer(
    {
        limits: {
            fieldNameSize: 999999999,
            fieldSize: 999999999
        },
        dest: '/'
    });

app.use(connect.logger('dev'));
app.get('/', function(req, res){
    res.send(
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="source">'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
});

app.post('/upload', upload.any(), function(req, res){

   //console.log(req.files);

    var tmp_path = req.files[0].path;
		console.log(tmp_path);
    var target_path = './' + req.files[0].originalname;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    console.log('saved file : ' + target_path)
    var options = {mode: 'text',pythonPath: '',pythonOptions: ['-u'],
                   scriptPath: '',args: [target_path]};
    PythonShell.run('ML.py',options, function(err, results){
      if(err){
	res.json({'error': 'error'});
				console.log(err)
      }else {
	console.log(results);
	res.json({'uri':req.files[0].fieldname, 'num': 1, 'tag': results[0], 'probability': results[1]});
      }
      fs.unlink(target_path, function (err){
        if (err) throw err;
        else console.log('successfully deleted');
      });
      fs.unlink(tmp_path, function (err){
        if (err) throw err;
        else console.log('successfully deleted');
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
