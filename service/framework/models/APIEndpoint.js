export default class APIEndpoint {

	//#region Properties

	/**
	 * The HTTP method on which the endpoint must be exposed.
	 * 
	 * @type {string}
	 */
	method = null;

	/**
	 * The URL method on which the endpoint must be exposed.
	 * 
	 * @type {string}
	 */
	url = null;

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