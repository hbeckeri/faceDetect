/*eslint-env node*/

var express = require('express');
var cfenv = require('cfenv');
var multer = require('multer');
var watson = require('watson-developer-cloud');
var fs = require('fs');
var app = express();
var appEnv = cfenv.getAppEnv();

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage, dest: 'uploads/'});

var alchemy_vision = watson.alchemy_vision({
    api_key: '7d6ba05c450e17f88ed8799ba614e9375424fd62'
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/upload', upload.single('image'), function(req, res){
    if (req.file) {
        var params = {
            image: fs.createReadStream(req.file.path)
        };

        alchemy_vision.recognizeFaces(params, function (err, keywords) {
            if (err) {
                res.send({error: "Something went wrong with watson"});
            }
            else {
                res.send({success: keywords});
            }
        });
    } else {
        res.send({error: "No image supplied"});
    }
});

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("FaceDetect: starting on " + appEnv.url);
});
