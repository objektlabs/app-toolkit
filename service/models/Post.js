/**
 * A model class representing a blog post.
 */
export default class Post {

	//#region Properties

	/**
	 * The unique post ID.
	 * 
	 * @type {number}
	 */
	id = null;

	/**
	 * The post title.
	 * 
	 * @type {string}
	 */
	title = null;

	/**
	 * The post content body.
	 * 
	 * @type {string}
	 */
	body = null;

	/**
	 * The ID of the user who made the post.
	 * 
	 * @type {string}
	 */
	userId = null;

	//#endregion

	//#region Constructors

	constructor(id, title, body, userId) {

		this.id = id;
		this.title = title;
		this.body = body;
		this.userId = userId;
	}

	//#endregion
}