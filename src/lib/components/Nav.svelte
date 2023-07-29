<script>
	import GithubIcon from './icons/GithubIcon.svelte';
	import YoutubeIcon from './icons/YoutubeIcon.svelte';
	import Logo from './icons/logo.svelte';
</script>

<nav
	class="flex items-center justify-between max-w-5xl mx-auto
          h-24 px-4"
>
	<a href="/">
		<Logo class="w-28 h-28" />
	</a>
	<ul class="flex space-x-4 text-2xl items-center">
		<li>
			<a href="https://www.youtube.com/@joseanmartinez/featured" target="_blank">
				<YoutubeIcon class="w-9 h-9 fill-white" />
			</a>
		</li>
		<li>
			<a href="https://github.com/josean-dev" target="_blank">
				<GithubIcon class="w-9 h-9 fill-white" />
			</a>
		</li>
	</ul>
</nav>
