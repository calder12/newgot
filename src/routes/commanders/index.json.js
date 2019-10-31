import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug,
		class: post.class,
		acqusition: post.acquisition
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}