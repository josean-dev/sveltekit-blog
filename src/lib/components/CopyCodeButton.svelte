<script lang="ts">
  import CheckIcon from "./svg/CheckIcon.svelte";
  import CopyIcon from "./svg/CopyIcon.svelte";

  let copyButton: HTMLButtonElement;
  let showCheckmark = false;

  function handleClick() {
    const preTagSibling =
      copyButton.nextElementSibling as HTMLPreElement;

    navigator.clipboard.writeText(preTagSibling.innerText);

    showCheckmark = true;

    setTimeout(() => (showCheckmark = false), 1000);
  }
</script>

<button
  bind:this={copyButton}
  on:click={handleClick}
  class={`p-1 absolute top-2 right-2 rounded-md
  shadow-md
  ${
    showCheckmark
      ? "bg-green-900"
      : "bg-gray-700 hover:bg-gray-600"
  }`}
>
  {#if showCheckmark}
    <CheckIcon class="w-6 h-6 fill-green-300" />
  {:else}
    <CopyIcon class="w-6 h-6 fill-white" />
  {/if}
</button>
