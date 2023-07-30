import type { MarkdownFile } from '$lib/utils';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const markdownFile: MarkdownFile = await import(`../../../cheatsheets/${params.slug}.md`);
	return {
		metadata: markdownFile.metadata,
		Cheatsheet: markdownFile.default
	};
}) satisfies PageLoad;
