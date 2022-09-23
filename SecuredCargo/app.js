var express = require('express');
var app = express();

app.use('/docflow', require('./docflow'));


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});

