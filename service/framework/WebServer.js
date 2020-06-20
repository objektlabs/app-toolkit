import http from 'http';

export default class WebServer {

	constructor(port) {

		this.port = port;

		this._endpoints = [];

		this._instance = http.createServer(this._handleRequest.bind(this)).listen(8080);
	}

	start() {
		
		//this._instance.listen(this.port);
	}

	stop() {

		this._instance.close();
	}

	registerEndpoint(method, uri, handler) {

		this._endpoints.push({
			method: method,
			uri: uri,
			handler: handler
		});
	}

	/**
	 * 
	 * @param {http.ClientRequest} request -
	 * @param {http.ServerResponse} response - 
	 */

	async _handleRequest(request, response) {

		let endpoint = this._endpoints.find(item => {

			if(item.method.toUpperCase() !== request.method.toUpperCase()) {
				return false;
			}

			// TODO - Match URI
			if(true) {
				return true;
			}
		});

		let result = await endpoint.handler(request);

		response.statusCode = result.code;
		//response.setHeader(result.headers);

		response.end(JSON.stringify(result.body));
	}
}