import type { MarkdownFile } from '$lib/utils';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const markdownFile: MarkdownFile = await import(`../../../posts/${params.slug}.md`);
	return {
		metadata: markdownFile.metadata,
		Post: markdownFile.default
	};
}) satisfies PageLoad;
