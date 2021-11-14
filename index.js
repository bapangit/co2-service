const http = require('http');

const port = process.env.PORT || 3000
const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Good Morning, All Friends!');
}

const server = http.createServer(requestListener);
server.listen(port);