import http from 'http';
import querystring from 'querystring';
import Stream from 'stream';

import { APIEndpoint, HttpResponse } from "./models";

/**
 * A native NodeJS implementation of an HTTP web server allowing for API & WebSocket endpoints to be registered and executed.
 */
class WebServer {

	//#region Properties

	/**
	 * The port the server should run on.
	 * 
	 * @type {number}
	 */
	port = null;

	/**
	 * The list of endpoints that the server can execute.
	 * @type {APIEndpoint[]}
	 */
	#endpoints = null;

	/**
	 * The port the server should run on.
	 * 
	 * @type {http.Server}
	 */
	#instance = null;

	//#endregion

	//#region Constructors

	/**
	 * Initialises the web server.
	 * 
	 * @param {number} port - The port number to run the web server on.
	 */
	constructor(port) {

		this.port = port;

		this.#endpoints = [];

		this.#instance = http.createServer(this._handleAPIRequest.bind(this));

		// See this URL for socket implementation.
		// https://medium.com/hackernoon/implementing-a-websocket-server-with-node-js-d9b78ec5ffa8
		/*
		this.#instance.on('upgrade', (req, socket) => {
			// Make sure that we only handle WebSocket upgrade requests
			if (req.headers['upgrade'] !== 'websocket') {
				socket.end('HTTP/1.1 400 Bad Request');
				return;
			}
			// More to come…

			socket.on('data', buffer => {

				//
				if(buffer.toString.startsWith("[ask_question]") {

				}
			});
		});
		*/
	}

	//#endregion

	//#region Server Control Handlers

	/**
	 * Start listening for requests on the web server.
	 * 
	 * @returns {void}
	 */
	start() {
		
		this.#instance.listen(this.port);
	}

	/**
	 * Stop listening for web server requests.
	 * 
	 * @returns {void}
	 */
	stop() {

		this.#instance.close();
	}

	//#endregion

	//#region API Endpoint Handlers

	/**
	 * Registers an API endpoint that the web server can execute.
	 * 
	 * @param {APIEndpoint} endpoint - The API endpoint to register.
	 * 
	 * @returns {void}
	 */
	addAPIEndpoint(endpoint) {

		this.#endpoints.push(endpoint);
	}

	/**
	 * Remove a given API endpoint from the registered list of endpoints.
	 * 
	 * @param {APIEndpoint} endpoint - The API endpoint to remove.
	 * 
	 * @returns {void}
	 */
	removeAPIEndpoint(endpoint) {

		this.#endpoints = this.#endpoints.filter(item => item !== endpoint);
	}

	/**
	 * Process incomming API requests by interpreting the request and executing a registered API endpoint matching the request detail, writing the result to a HTTP response.
	 * 
	 * @param {http.IncomingMessage} request - The incomming HTTP request.
	 * @param {http.ServerResponse} response - The outgoing HTTP response.
	 * 
	 * @returns {void}
	 */
	async _handleAPIRequest(request, response) {

		// Get the base request URI, excluding query parameters.
		let requestURI = request.url;

		let queryStringIndex = requestURI.indexOf('?');

		if(queryStringIndex > -1) {
			requestURI = requestURI.substring(0, queryStringIndex);
		}

		// Default additional properties on request object.
		request.path = {};
		request.query = {};

		// Attempt to lookup a registered endpoint matching the received request pattern.
		const matchedEndpoint = this.#endpoints.find(endpoint => {

			// Check that the endpoint and request methods match.
			if(endpoint.method.toUpperCase() !== request.method.toUpperCase()) {
				return false;
			}

			// Check that the endpoint and request URI parts are equal.
			const requestURIParts = requestURI.split('/');
			const endpointURIParts = endpoint.uri.split('/');

			if(requestURIParts.length != endpointURIParts.length) {
				return false;
			}

			// Check that the endpoint and request URI parts match at each index (ignoring variable parts, e.g. {variable}).
			for(let i = 0; i < requestURIParts.length; i++) {

				let isVariable = endpointURIParts[i].startsWith('{') && endpointURIParts[i].endsWith('}');

				if(!isVariable) {
					
					if(requestURIParts[i].toLowerCase() !== endpointURIParts[i].toLowerCase()) {
						return false;
					}

				} else { // It's a path variable, we better populate it on the request object so that it's available to the user.

					request.path[endpointURIParts[i].substring(1, endpointURIParts[i].length - 1)] = requestURIParts[i];
				}
			}

			return true;
		});

		// Send a not found response if there's no registered endpoint matching the request.
		if(!matchedEndpoint) {

			response.statusCode = 404;
			response.end();

			return;
		}

		// Parse query strings that may be present on the incoming request.
		if(queryStringIndex > -1) {
			request.query = querystring.parse(request.url.substring(queryStringIndex + 1));
		}

		// Execute the found endpoint handler function.
		const result = await matchedEndpoint.handler(request);

		// Handler did not return any value, send empty content as the response.
		if(!result) {
			
			response.statusCode = 204;
			response.end();

			return;
		}
		
		// Process the handler function result as an HTTP response.
		if(result instanceof HttpResponse) {

			// Set the HTTP response status code (default to OK or Empty Content).
			response.statusCode = result.statusCode || (result.body ? 200 : 204);
	
			// Set the HTTP response headers.
			for (const header in result.headers) {
				response.setHeader(header, result.headers[header]);
			}

			// Set the HTTP response body (if set).
			let bodyContent = null;
			let contentType = null;

			if(result.body) {

				// Pipe the handler result to the HTTP response if it is a streaming result type.
				if(result.body instanceof Stream.Readable) {

					response.setHeader('Content-Type', 'application/octet-stream');
					response.pipe(result.body);

					return;
				}

				// For all other result types, try to parse the result to the given content type.
				let contentTypeHeaderKey = Object.keys(result.headers).find(item => item.toLowerCase() === 'content-type');
				
				contentType = result.headers[contentTypeHeaderKey];

				switch((contentType || '').toLowerCase()) {

					case 'application/json':
						bodyContent = JSON.stringify(result.body);
						break;

					default:
						bodyContent = result.body;
						break;
				}
			}

			// Send & close the HTTP response.
			response.end(bodyContent);

			return;
		}

		// Handler returned a malformed or invalid response, send back an internal server error.
		response.statusCode = 500;
		response.end('Unsupported response supplied by endpoint handler, please review handler implementation.');
	}

	//#endregion

	//#region Socket Endpoint Handlers



	//#endregion
}

export { WebServer as default, WebServer }