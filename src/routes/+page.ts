import type { FetchMarkdownPostsResult, MarkdownFile } from '$lib/utils';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const posts: FetchMarkdownPostsResult = await response.json();

	return {
		posts
	};
}) satisfies PageLoad;
