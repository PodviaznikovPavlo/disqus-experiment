var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));


app.get('/time', function(req, res){
  res.send(new Date().toString());
});

app.listen(3000);
console.log('Listening on port 3000');