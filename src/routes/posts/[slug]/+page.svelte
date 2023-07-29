<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { metadata, Post } = data;
</script>

<header>
	<div class="w-full sm:w-3/4 mb-6">
		<div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
			<iframe
				title="youtube-video"
				id="ytplayer"
				src={`https://www.youtube.com/embed/${metadata.youtubeId}?origin=http://example.com`}
				frameborder="0"
				allowfullscreen
			/>
		</div>
	</div>
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
<article class="prose prose-lg prose-invert max-w-none py-6">
	<Post />
</article>
