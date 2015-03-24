var http = require('http');

server = http.createServer(function(req, res) {
	var body = '';
	req.on('data', function(trunk){
		body += trunk;
	});

	req.on('end', function() {
		// node.js 0.10 did not have rawHeaders
		if (!req.rawHeaders) {
			req.rawHeaders = [];
			for (var name in req.headers) {
				if (req.headers.hasOwnProperty(name))
					req.rawHeaders.concat(name, req.headers[name]);
			}
		}

		res.write(req.method + ' '+req.url + ' HTTP/' + req.httpVersion + '\r\n');

		for (var i = 0, j = req.rawHeaders.length; i < j; i += 2) {
			var head = req.rawHeaders;
			res.write(head[i]+': '+head[i+1]+'\r\n');
		}

		res.write('\r\n');

		res.end(body);
	});
});

server.listen(10000, function () {
	console.log('Server started at port: 10000!')
});