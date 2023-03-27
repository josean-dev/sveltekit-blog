<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { metadata, Post } = data;
</script>

<header class="pt-4 pb-8">
	<div class="w-3/4 mb-6">
		<div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
			<!-- <img class="w-full h-full object-cover" src={metadata.img} alt="" /> -->
			<iframe
				title="youtube-video"
				id="ytplayer"
				type="text/html"
				src={`https://www.youtube.com/embed/${metadata.youtubeId}?origin=http://example.com`}
				frameborder="0"
				allowfullscreen
			/>
		</div>
	</div>
	<h1 class="text-4xl font-bold">{metadata.title}</h1>
</header>
<article class="prose prose-lg dark:prose-invert max-w-none py-8">
	<Post />
</article>
