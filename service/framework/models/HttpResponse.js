/**
 * A response message to send for an API request.
 */
class HttpResponse {

	//#region Properties

	/**
	 * The content body of the API response.
	 * 
	 * @type {any}
	 */
	body = null;

	/**
	 * The HTTP response status code, e.g. 200, 204, 401, etc.
	 * 
	 * @type {number}
	 */
	statusCode = null;

	/**
	 * The HTTP headers to send with the API response.
	 * 
	 * @type {Object}
	 */
	headers = null;

	//#endregion
	
	//#region Constructors

	constructor({ body, statusCode = 200, headers = { 'Content-Type': 'application/json' } } = {}) {

		this.body = body;
		this.statusCode = statusCode;
		this.headers = headers;
	}

	//#endregion
}

export { HttpResponse as default, HttpResponse }