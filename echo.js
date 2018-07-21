const http = require('http');
const PORT = process.env.PORT || 10000;

const server = http.createServer(function(req, res) {
  const buffers = [];
  req.on('data', function(trunk){
    buffers.push(trunk);
  });

  req.on('end', function() {
	  res.write(req.method + ' '+req.url + ' HTTP/' + req.httpVersion + '\r\n');

	  for (let i = 0, j = req.rawHeaders.length; i < j; i += 2) {
	    const head = req.rawHeaders;
	    res.write(head[i]+': '+head[i+1]+'\r\n');
	  }

	  res.write('\r\n');
	  const body = Buffer.concat(buffers);
	  res.end(body);
  });
});

server.listen(PORT, function () {
  console.log(`Server started at port: ${PORT}!`);
});
