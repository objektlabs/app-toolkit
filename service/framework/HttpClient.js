import HttpError from './models/HttpError';
import HttpResponse from './models/HttpResponse';

import http from 'http';
import https from 'https';
import querystring from 'querystring';
import stream from 'stream';

/**
 * Helper class that facilitates executing http requests.
 */
class HttpClient {

	//#region Properties

	/**
	 * The URL which must be targetted.
	 * 
	 * @type {string}
	 */
	url = null;

	/**
	 * The HTTP verb to use when executing the request.
	 * 
	 * @type {string}
	 */
	method = null;

	/**
	 * The content which must be included in the request payload.
	 * 
	 * @type {Object}
	 */
	body = null;

	/**
	 * The headers which must be included in the request.
	 * 
	 * @type {Object}
	 */
	headers = null;

	/**
	 * The url-encoded form which must be included in the request payload.
	 * 
	 * @type {Object}
	 */
	form = null;

	/**
	 * The multipart form-data form which must be included in the request payload.
	 * 
	 * @type {Object}
	 */
	formData = null;

	/**
	 * The querystrings which must be included in the request.
	 * 
	 * @type {Object}
	 */
	query = null;

	/**
	 * The number specifying the request timeout in milliseconds.
	 * 
	 * @type {number}
	 */
	timeout = null;

	//#endregion

	//#region Constructors

	/**
	 * Initialises the http client.
	 * 
	 * @param {string} url - The URL which must be targetted.
	 * @param {string} method - The HTTP verb to use when executing the request.
	 * @param {Object} [options] - Optional, options specifying request configuration.
	 * @param {Object} [options.body] - Optional, content which must be included in the request payload.
	 * @param {Object} [options.headers] - Optional, headers which must be included in the request.
	 * @param {Object} [options.form] - Optional, url-encoded form which must be included in the request payload.
	 * @param {Object} [options.formData] - Optional, multipart form-data form which must be included in the request payload.
	 * @param {Object} [options.query] - Optional, querystrings which must be included in the request.
	 * @param {number} [options.timeout] - Optional, number specifying the request timeout in milliseconds.
	 */
	constructor(url, method, { body, headers, form, formData, query, timeout }) {

		this.url = url;
		this.method = method;
		this.body = body;
		this.headers = headers;
		this.form = form;
		this.formData = formData;
		this.query = query;
		this.timeout = timeout;
	}

	//#endregion

	//#region Static request builder methods

	/**
	 * Executes a HTTP DELETE request against a given URI.
	 * 
	 * @param {string} url - The URL which must be targetted.
	 * @param {Object} [options] - Optional, options specifying request configuration.
	 * @param {Object} [options.headers] - Optional, headers which must be included in the request.
	 * @param {Object} [options.query] - Optional, querystrings which must be included in the request.
	 * @param {number} [options.timeout] - Optional, number specifying the request timeout in milliseconds.
	 * 
	 * @returns {HttpClient} - A new instance of the HttpClient class configured for the request.
	 */
	static delete(url, { headers, query, timeout } = {}) {

		return new HttpClient(url, 'DELETE', {
			headers: headers,
			query: query,
			timeout: timeout
		});
	}

	/**
	 * Executes a HTTP GET request against a given URI.
	 * 
	 * @param {string} url - The URL which must be targetted.
	 * @param {Object} [options] - Optional, options specifying request configuration.
	 * @param {Object} [options.headers] - Optional, headers which must be included in the request.
	 * @param {Object} [options.query] - Optional, querystrings which must be included in the request.
	 * @param {number} [options.timeout] - Optional, number specifying the request timeout in milliseconds.
	 * 
	 * @returns {HttpClient} - A new instance of the HttpClient class configured for the request.
	 */
	static get(url, { headers, query, timeout } = {}) {

		return new HttpClient(url, 'GET', {
			headers: headers,
			query: query,
			timeout: timeout
		});
	}

	/**
	 * Executes a HTTP PATCH request against a given URI.
	 * 
	 * @param {string} url - The URL which must be targetted.
	 * @param {Object} [options] - Optional, options specifying request configuration.
	 * @param {Object} [options.body] - Optional, request payload which must be included in the request.
	 * @param {Object} [options.form] - Optional, url-encoded form which must be included in the request.
	 * @param {Object} [options.formData] - Optional, multipart/form-data form which must be included in the request.
	 * @param {Object} [options.headers] - Optional, headers which must be included in the request.
	 * @param {Object} [options.query] - Optional, querystrings which must be included in the request.
	 * @param {number} [options.timeout] - Optional, number specifying the request timeout in milliseconds.
	 * 
	 * @returns {HttpClient} - A new instance of the HttpClient class configured for the request.
	 */
	static patch(url, { body, form, formData, headers, query, timeout } = {}) {

		return new HttpClient(url, 'PATCH', {
			headers: headers,
			body: body,
			query: query,
			form: form,
			formData: formData,
			timeout: timeout
		});
	}

	/**
	 * Executes a HTTP POST request against a given URI.
	 * 
	 * @param {string} url - The URL which must be targetted.
	 * @param {Object} [options] - Optional, options specifying request configuration.
	 * @param {Object} [options.body] - Optional, request payload which must be included in the request.
	 * @param {Object} [options.form] - Optional, url-encoded form which must be included in the request.
	 * @param {Object} [options.formData] - Optional, multipart/form-data form which must be included in the request.
	 * @param {Object} [options.headers] - Optional, headers which must be included in the request.
	 * @param {Object} [options.query] - Optional, querystrings which must be included in the request.
	 * @param {number} [options.timeout] - Optional, number specifying the request timeout in milliseconds.
	 * 
	 * @returns {HttpClient} - A new instance of the HttpClient class configured for the request.
	 */
	static post(url, { body, form, formData, headers, query, timeout } = {}) {

		return new HttpClient(url, 'POST', {
			headers: headers,
			body: body,
			query: query,
			form: form,
			formData: formData,
			timeout: timeout
		});
	}

	/**
	 * Executes a HTTP PUT request against a given URI.
	 * 
	 * @param {string} url - The URL which must be targetted.
	 * @param {Object} [options] - Optional, options specifying request configuration.
	 * @param {Object} [options.body] - Optional, request payload which must be included in the request.
	 * @param {Object} [options.form] - Optional, url-encoded form which must be included in the request.
	 * @param {Object} [options.formData] - Optional, multipart/form-data form which must be included in the request.
	 * @param {Object} [options.headers] - Optional, headers which must be included in the request.
	 * @param {Object} [options.query] - Optional, querystrings which must be included in the request.
	 * @param {number} [options.timeout] - Optional, number specifying the request timeout in milliseconds.
	 * 
	 * @returns {HttpClient} - A new instance of the HttpClient class configured for the request.
	 */
	static put(url, { body, form, formData, headers, query, timeout } = {}) {

		return new HttpClient(url, 'PUT', {
			headers: headers,
			body: body,
			query: query,
			form: form,
			formData: formData,
			timeout: timeout
		});
	}

	//#endregion

	//#region Instance response parsing methods

	/**
	 * Execute the HTTP request without applying transformation on the response payload.
	 * 
	 * @returns {Promise<HttpResponse>} - The response resulting from execution of the request, without expecting a response payload.
	 */
	empty() {

		// Execute request and get response.
		return this._fetch();
	}

	/**
	 * Execute the HTTP request and parse the response payload to JSON.
	 * 
	 * @returns {Promise<HttpResponse>} - The response resulting from execution of the request, with the payload parsed as JSON.
	 */
	async json() {

		// Execute request and get response.
		const response = await this._fetch();

		try {

			throw new Error('asd')
			response.body = JSON.parse(response.body);

		} catch(error) {
			throw new HttpError(`Unable to parse response body as JSON '${error.message}'`, response);
		}

		return response;
	}

	/**
	 * Execute the HTTP request and transform the response payload to string.
	 * 
	 * @returns {Promise<HttpResponse>} - The response resulting from execution of the request, with the payload as a string.
	 */
	text() {

		// Execute request and get response.
		return this._fetch();
	}

	/**
	 * Execute the HTTP request without applying transformation on the response payload.
	 * 
	 * @returns {Promise<HttpResponse>} - The response resulting from execution of the request, without manipulating the response payload.
	 */
	raw() {

		// Execute request and get response.
		return this._fetch();
	}

	/**
	 * Execute the HTTP request and makes the raw response stream directly available in the response model.
	 * 
	 * @returns {Promise<HttpResponse>} - The response resulting from execution of the request.
	 */
	stream() {
		return this._fetch(true);
	}

	/**
	 * Execute the HTTP request, piping its output into a writable stream.
	 * 
	 * @param {stream.Writable} writeableStream - The stream to which the response must be written to.
	 * 
	 * @returns {stream.Readable} - The readable stream resulting from piping to the writable stream provided.
	 */
	async pipe(writeableStream) {
		return (await this._fetch(true)).body.pipe(writeableStream);
	}

	//#endregion

	//#region Private methods

	/**
	 * Execute the configured HTTP request.
	 * 
	 * @param {boolean} [streamResponse=false] - Optional, indicator of whether the raw response stream must be returned as the payload.
	 * Default `false`.
	 * 
	 * @returns {Promise<HttpResponse>} - The response resulting from execution of the request.
	 */
	_fetch(streamResponse = false) {

		return new Promise((resolve, reject) => {

			// Ensure no more than one payload type was provided.
			if ([this.body, this.form, this.formData].filter(item => item !== undefined).length > 1) { // eslint-disable-line no-undefined
				reject(new Error('Only one payload type [body, form or formData] may be populated per request'));
			}

			// Determine whether http or https module should be used.
			let httpModule = http;

			if (this.url.toLowerCase().startsWith('http://')) {
				httpModule = http;
			} else if (this.url.toLowerCase().startsWith('https://')) {
				httpModule = https;
			} else {
				reject(new Error(`Expected URL [${this.url}] to start with protocol 'http://' or 'https://'`));
			}

			const requestOptions = {
				method: this.method,
				headers: this.headers
			};

			if (this.timeout) {
				requestOptions.timeout = this.timeout;
			}

			// Stringify query object into valid querystring and append to the target URL.
			if (this.query) {
				this.url += `?${querystring.stringify(this.query)}`;
			}

			// Create http request, execute it and handle response.
			const httpRequest = httpModule.request(this.url, requestOptions, response => {

				if (streamResponse) {

					resolve(new HttpResponse({
						statusCode: response.statusCode,
						headers: response.headers,
						body: response
					}));

				} else {

					let dataChunks = '';

					response.on('data', chunk => {
						dataChunks += chunk;
					});

					response.on('error', error => {
						reject(error);
					});

					response.on('end', () => {

						resolve(new HttpResponse({
							statusCode: response.statusCode,
							headers: response.headers,
							body: dataChunks
						}));
					});
				}
			});

			// Handle errors that occur on the http request.
			httpRequest.on('error', error => {
				reject(error);
			});

			// Handle errors that occur on the http request.
			httpRequest.on('timeout', () => {
				reject(new Error('http request timed out'));
			});

			// Write the payload into the http request.
			if (this.body) {

				if (this.body instanceof stream.Readable) {

					// No need to signal the end of the http request as it will be triggerred on the end of the stream.
					this.body.pipe(httpRequest);

				} else {

					httpRequest.write(this.body);

					// Signal the end of the http request.
					httpRequest.end();
				}

			} else if (this.form) {

				// Mutate payload accordingly and write into http request.
				httpRequest.write(querystring.stringify(this.form));

				// Signal the end of the http request.
				httpRequest.end();

			} else if (this.formData) {

				// FormData must be streamed into the http request.
				// No need to signal the end of the http request as it will be triggerred on the end of the FormData stream.
				// this.formData.pipe(httpRequest);

				reject(new Error('formData not supported yet')); // TODO: support formData

			} else {

				// Signal the end of the http request immediately for requests without a body, form or formData.
				httpRequest.end();
			}
		});
	}

	//#endregion
}

export { HttpClient as default, HttpClient }