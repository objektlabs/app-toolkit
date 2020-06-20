export default class Post {

	constructor(id, title, body, userId) {

		this.id = id;
		this.title = title;
		this.body = body;
		this.userId = userId;
	}

	get id() {
		return this._id;
	}

	set id(value) {
		this._id = value;
	}

	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
	}

	get body() {
		return this._body;
	}

	set body(value) {
		this._body = value;
	}

	get userId() {
		return this._userId;
	}

	set userId(value) {
		this._userId = value;
	}
}