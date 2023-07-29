<script lang="ts">
	import ReadIcon from '$lib/components/icons/ReadIcon.svelte';
	import YoutubeIcon from '$lib/components/icons/YoutubeIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: console.log(data);
</script>

<section class="grid grid-cols-12 py-10 gap-x-6">
	<div class="col-span-9 space-y-4">
		<h1 class="text-4xl font-bold">Hey! I'm Josean Martinez.</h1>
		<p class="text-2xl font-light">
			I'm a full stack software engineer passionate about web development, Neovim, split mechanical
			keyboards, and sharing what I know.
		</p>
		<p class="text-2xl font-thin">
			You can find me on my youtube channel and I also like to blog here to supplement the videos I
			make!
		</p>
	</div>
	<div class="col-span-3">
		<div class="w-full aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
			<img src="/youtube-profile-picture.jpg" alt="Profile" class="w-full h-full object-cover" />
		</div>
	</div>
</section>

<section>
	<header class="inline-block border-b py-2 pr-6 mb-4">
		<h2 class="text-3xl font-semibold">Blog Posts</h2>
	</header>
	<div class="divide-y divide-gray-700">
		{#each data.posts as post, i}
			{@const youtubeHref = `https://youtu.be/${post.metadata.youtubeId}`}
			<div class="sm:flex py-4">
				<a href={post.path} class="w-full sm:w-80 mr-4 block">
					<div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
						<img class="w-full h-full object-cover" src={post.metadata.img} alt="" />
					</div>
				</a>
				<div class="pt-4 sm:pt-0 flex-1 relative">
					<a href={post.path} class="block">
						<h4 class="font-medium mb-1">{post.metadata.title}</h4>
						<span class="font-light text-gray-300">Published: {post.metadata.publishedAt}</span>
					</a>
					<a href={post.path} class="block py-3">
						<p class="font-light">{post.metadata.summary}</p>
					</a>
					<div class="flex items-center space-x-4 text-gray-300 text-sm font-light">
						<a href={post.path} class="flex space-x-1 items-center border-b border-current">
							<span>Read More</span>
							<ReadIcon class="w-5 h-5 fill-current" />
						</a>
						<a
							href={youtubeHref}
							class="flex space-x-1 items-center border-b border-current"
							target="_blank"
						>
							<span>Watch Video</span>
							<YoutubeIcon class="w-5 h-5 fill-current" />
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
