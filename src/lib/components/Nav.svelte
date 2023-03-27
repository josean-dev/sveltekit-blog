<script>
	import Logo from './icons/logo.svelte';
</script>

<nav
	class="flex items-center justify-between max-w-5xl mx-auto
            h-24"
>
	<a href="/">
		<Logo class="w-28 h-28" />
	</a>
	<ul class="flex space-x-4 text-2xl">
		<li>
			<a href="/blog">Blog</a>
		</li>
		<li href="/about-me">About Me</li>
	</ul>
</nav>
