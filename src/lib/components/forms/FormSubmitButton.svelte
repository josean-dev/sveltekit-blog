<script lang="ts">
  import Button from "../Button.svelte";

  export let submitting = false;
</script>

<Button loading={submitting} class="w-full">
  <slot />
</Button>
