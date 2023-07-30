<script>
	import GithubIcon from './icons/GithubIcon.svelte';
	import YoutubeIcon from './icons/YoutubeIcon.svelte';
	import Logo from './icons/logo.svelte';
</script>

<nav
	class="flex items-center justify-between max-w-6xl mx-auto
          h-24 px-4"
>
	<a href="/">
		<Logo class="w-28 h-28" />
	</a>
	<div class="flex space-x-3 text-2xl items-center">
		<a href="https://www.youtube.com/@joseanmartinez/featured" target="_blank">
			<YoutubeIcon class="w-10 h-10 fill-white" />
		</a>
		<a href="https://github.com/josean-dev" target="_blank">
			<GithubIcon class="w-10 h-10 fill-white" />
		</a>
	</div>
</nav>
