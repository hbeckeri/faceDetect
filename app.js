/*eslint-env node*/

var express = require('express');
var cfenv = require('cfenv');
var app = express();
var appEnv = cfenv.getAppEnv();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/upload', function(req, res) {
    res.send({success: "hi traver"});
});

app.post('/upload', function(req, res){
   res.send({success: "good job"});
});

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});
