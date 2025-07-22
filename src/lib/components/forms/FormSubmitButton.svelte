<script lang="ts">
  import Button from "../Button.svelte";

  interface Props {
    submitting?: boolean;
    children?: import('svelte').Snippet;
  }

  let { submitting = false, children }: Props = $props();
</script>

<Button loading={submitting} class="w-full">
  {@render children?.()}
</Button>
