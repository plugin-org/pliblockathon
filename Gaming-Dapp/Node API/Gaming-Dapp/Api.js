var http=require('http');
var data='{"name":"Akshat"}'
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'application\'json'})
    res.write(JSON.stringify(data));
    res.end();
}).listen(3000)