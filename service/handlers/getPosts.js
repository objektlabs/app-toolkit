import http from 'http';

import HttpResponse from '../framework/models/HttpResponse';

import Post from '../models/Post';

/**
 * Look up a list of blog posts.
 * 
 * @param {http.IncomingMessage} req - The incomming HTTP request.
 * 
 * @returns {HttpResponse} A HTTP response containing the list of available blog posts.
 */
export default async (req) => {

	const posts = [
		new Post(1, 'Hello', 'World', 2),
		new Post(3, 'Test', 'Post', 4)
	];

	return new HttpResponse({ body: posts });
}