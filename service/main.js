import http from 'http';

http.createServer((req, res) => {

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('Hello World');

}).listen(8080);