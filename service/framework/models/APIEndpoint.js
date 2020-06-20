/**
 * A model representing an API endpoint and it's handler function.
 */
class APIEndpoint {

	//#region Properties

	/**
	 * The HTTP method on which the endpoint must be exposed, e.g. GET, PUT, POST, etc.
	 * 
	 * @type {string}
	 */
	method = null;

	/**
	 * The URL path template on which the endpoint must be exposed, e.g. /posts/{id}.
	 * 
	 * @type {string}
	 */
	uri = null;

	/**
	 * The function to execute when the endpoint is invoked.
	 * 
	 * @type {Function}
	 */
	handler = null;

	//#endregion
	
	//#region Constructors

	constructor(method, uri, handler) {

		this.method = method;
		this.uri = uri;
		this.handler = handler;
	}

	//#endregion
}

export { APIEndpoint as default, APIEndpoint }