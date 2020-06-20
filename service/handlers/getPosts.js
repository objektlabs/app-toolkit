import Post from '../models/Post';

export default async (req) => {

	const posts = [
		new Post(1, 'Hello', 'World', 2),
		new Post(3, 'Test', 'Post', 4)
	];

	return {
		code: 200,
		headers: { 'Content-Type': 'application/json' },
		body: {
			posts: posts
		}
	}
}