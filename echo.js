var http = require('http');

server = http.createServer(function(req, res) {
	var buffers = [];
	req.on('data', function(trunk){
        console.log(trunk);
        buffers.push(trunk);
	});

	req.on('end', function() {
		// node.js 0.10 did not have rawHeaders
		if (1 || !req.rawHeaders) {
			req.rawHeaders = [];
			for (var name in req.headers) {
				if (req.headers.hasOwnProperty(name)) {
					req.rawHeaders.push(name);
					req.rawHeaders.push(req.headers[name]);
				}
			}
		}

		res.write(req.method + ' '+req.url + ' HTTP/' + req.httpVersion + '\r\n');

		for (var i = 0, j = req.rawHeaders.length; i < j; i += 2) {
			var head = req.rawHeaders;
			res.write(head[i]+': '+head[i+1]+'\r\n');
		}

		res.write('\r\n');

		var body = Buffer.concat(buffers);

		res.end(body);
	});
});

server.listen(10000, function () {
	console.log('Server started at port: 10000!')
});
