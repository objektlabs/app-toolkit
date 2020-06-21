import HttpResponse from "./HttpResponse";

/**
 * Error model representing an HTTP error.
 */
class HttpError extends Error {

	//#region Properties

	/**
	 * The HTTP response which was received before the error occurred.
	 * 
	 * @type {HttpResponse}
	 */
	response = null;

	//#endregion

	//#region Constructors

	/**
	 * 
	 * @param {string} message 
	 * @param {HttpResponse} [response] - Optional, The HTTP response which was received before the error occurred.
	 */
	constructor(message, response) {

		super(message);

		this.name = 'HttpError';
		this.response = response;
	}

	//#endregion
}

export { HttpError as default, HttpError }