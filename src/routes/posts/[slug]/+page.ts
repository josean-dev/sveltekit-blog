import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const markdownFile = await import(`../../../posts/${params.slug}.md`);
	return {
		metadata: markdownFile.metadata,
		Post: markdownFile.default
	};
}) satisfies PageLoad;
