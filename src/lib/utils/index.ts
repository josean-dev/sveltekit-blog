export type MarkdownFile = {
	metadata: {
		title: string;
		img: string;
		youtubeId: string;
		publishedAt: string;
		summary: string;
	};
	default: any;
};

export type FetchMarkdownPostsResult = {
	metadata: MarkdownFile['metadata'];
	path: string;
}[];

export async function fetchMarkdownPosts() {
	const allPostFiles = import.meta.glob('/src/posts/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as MarkdownFile;
			const postPath = path.slice(4, -3);

			return {
				metadata,
				path: postPath
			};
		})
	);

	return allPosts;
}
