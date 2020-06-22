import http from 'http';

import HttpClient from '../framework/HttpClient';
import * as HttpHeaders from '../framework/HttpHeaders';
import HttpResponse from '../framework/models/HttpResponse';
import * as MimeTypes from '../framework/MimeTypes';

/**
 * Look up specific blog post.
 * 
 * @param {http.IncomingMessage} req - The incomming HTTP request.
 * 
 * @returns {HttpResponse} A HTTP response containing the blog post.
 */
export default async (req) => {

	let post = null;

	try {
		post = await HttpClient.get(`https://jsonplaceholder.typicode.com/posts/${req.path.postId}`,{
			headers: {
				[HttpHeaders.ACCEPT]: MimeTypes.APLLICATION_JSON
			}
		}).json();

	} catch(error) {

		return new HttpResponse({ statusCode: 418, body: 'something bad happened - unable to get post from typicode API' });
	}

	return new HttpResponse({ body: post.body });
}