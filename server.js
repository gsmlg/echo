const http = require('http');
const PORT = process.env.NODE_PORT || 80;

const server = http.createServer(function(req, res) {
  const buffers = [];
  req.on('data', function(trunk){
    buffers.push(trunk);
  });

  req.on('end', function() {
      console.log(`===> Request from ${req && req.connection && req.connection.remoteAddress} <===`);

	  res.write(req.method + ' '+req.url + ' HTTP/' + req.httpVersion + '\r\n');
	  console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);

	  for (let i = 0, j = req.rawHeaders.length; i < j; i += 2) {
	    const head = req.rawHeaders;
	    res.write(head[i]+': '+head[i+1]+'\r\n');
	    console.log(`${head[i]}: ${head[i+1]}`);
	  }

	  res.write('\r\n');
	  const body = Buffer.concat(buffers);

	  console.log('\r\n');
      console.log(body.toString());

	  res.end(body);

  });
});

server.listen(PORT, function () {
  console.log(`Server started at port: ${PORT}!`);
});
