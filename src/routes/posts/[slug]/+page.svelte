<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import CopyCodeButton from '$lib/components/CopyCodeButton.svelte';

	export let data: PageData;

	const { metadata, Post } = data;

	onMount(() => {
		// will add a children to any <pre> element with class language-*
		let pres: HTMLCollection = document.getElementsByTagName('pre');
		for (let _ of pres) {
			const pre = _ as HTMLPreElement;
			if ([...pre.classList].some((el) => el.startsWith('language-'))) {
				const preParent = pre.parentNode;

				const wrapper = document.createElement('div');
				wrapper.className = 'relative';

				new CopyCodeButton({
					target: wrapper
				});

				if (preParent) {
					preParent.replaceChild(wrapper, pre);
					wrapper.appendChild(pre);
				}
			}
		}
	});
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

<article class="prose prose-invert max-w-none py-6">
	<Post />
</article>
