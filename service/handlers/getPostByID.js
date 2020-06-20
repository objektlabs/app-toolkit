import http from 'http';

import HttpResponse from '../framework/models/HttpResponse';

import Post from '../models/Post';

/**
 * Look up specific blog post.
 * 
 * @param {http.IncomingMessage} req - The incomming HTTP request.
 * 
 * @returns {HttpResponse} A HTTP response containing the blog post.
 */
export default async (req) => {

	const post = new Post(1, 'Hello', 'World', 2);

	return new HttpResponse({ body: post, statusCode: 500 });
}