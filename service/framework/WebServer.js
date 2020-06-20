import http from 'http';

export default class WebServer {

	constructor(port) {

		this.port = port;

		this._endpoints = [];

		this._instance = http.createServer(this._handleRequest.bind(this));
	}

	start() {
		
		this._instance.listen(this.port);
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

		const endpoint = this._endpoints.find(item => {

			if(item.method.toUpperCase() !== request.method.toUpperCase()) {
				return false;
			}

			// TODO - Match URI
			if(true) {
				return true;
			}
		});

		const result = await endpoint.handler(request);

		response.statusCode = result.code;

		for (const header in result.headers) {
			response.setHeader(header, result.headers[header]);
		}

		// TODO: Stringify response body according to Content-Type header, if not already in acceptable format (string / Buffer).

		response.end(JSON.stringify(result.body));
	}
}