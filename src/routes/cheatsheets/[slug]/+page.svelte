<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { metadata, Cheatsheet } = data;
</script>

<header>
	<div>
		<div class="mb-4">
			<h1 class="text-4xl font-bold">{metadata.title}</h1>
		</div>
		<div class="py-2 border-t inline-block space-x-2">
			<span class="font-semibold">Published:</span><span class="font-light">
				{metadata.publishedAt}</span
			>
		</div>
	</div>
</header>

<article
	class="prose prose-invert max-w-none py-6 prose-td:p-4 prose-th:p-4 prose-th:text-base prose-td:text-base"
>
	<Cheatsheet />
</article>
