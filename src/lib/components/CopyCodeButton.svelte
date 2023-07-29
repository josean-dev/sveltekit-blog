<script lang="ts">
	import CheckIcon from './icons/CheckIcon.svelte';
	import CopyIcon from './icons/CopyIcon.svelte';

	let copyButton: HTMLButtonElement;
	let showCheckmark: boolean = false;

	function handleClick() {
		const preElementSibling = copyButton.nextElementSibling as HTMLPreElement;

		navigator.clipboard.writeText(preElementSibling.innerText);

		showCheckmark = true;

		setTimeout(() => (showCheckmark = false), 1000);
	}
</script>

<button
	on:click={handleClick}
	bind:this={copyButton}
	class={`p-1 absolute top-2 right-2 rounded-md text-white shadow-md
        ${showCheckmark ? 'bg-green-900' : 'bg-gray-700 hover:bg-gray-600'}`}
>
	{#if showCheckmark}
		<CheckIcon class="w-6 h-6 fill-green-300" />
	{:else}
		<CopyIcon class="w-6 h-6 fill-white" />
	{/if}
</button>
