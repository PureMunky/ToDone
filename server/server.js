var http = require('http');
var url = require('url');

function start() {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log('Request for ' + pathname + ' recieved');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('yep, you just found my node server! please be nice!! :D');
  }

  http.createServer(onRequest).listen(80);
  console.log('Server Started');
}

exports.start = start;
