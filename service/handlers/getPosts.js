import http from 'http';

import HttpClient from '../framework/HttpClient';
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

	let posts = null;

	try {
		posts = await HttpClient.get('https://jsonplaceholder.typicode.com/posts').json();

	} catch(error) {

		return new HttpResponse({ statusCode: 418, body: 'something bad happened - unable to get posts from typicode API' });
	}

	return new HttpResponse({ body: posts });
}