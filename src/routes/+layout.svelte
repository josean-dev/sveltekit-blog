<script>
	import '../app.css';
	import '../prism-night-owl.css';
	import Nav from '../lib/components/Nav.svelte';
</script>

<header
	class="fixed z-10 top-0 inset-x-0 border-b border-gray-800
  bg-gray-900"
>
	<Nav />
</header>
<main class="mt-24 max-w-6xl mx-auto px-4 pt-4 pb-8"><slot /></main>
<footer />
