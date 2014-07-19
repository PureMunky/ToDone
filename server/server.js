var http = require('http');
var url = require('url');

function start(route) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log('Request for ' + pathname + ' recieved');

    route(pathname);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('yep, you just found my node server! please be nice!! :D');
  }

  http.createServer(onRequest).listen(1337);
  console.log('Server Started');
}

exports.start = start;
