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
  class={`absolute right-3 top-3 rounded-md p-1
  shadow-md
  ${
    showCheckmark ? "bg-green-900" : "bg-gray-700 hover:bg-gray-600"
  }`}
>
  {#if showCheckmark}
    <CheckIcon class="h-6 w-6 fill-green-300" />
  {:else}
    <CopyIcon class="h-6 w-6 fill-white" />
  {/if}
</button>
