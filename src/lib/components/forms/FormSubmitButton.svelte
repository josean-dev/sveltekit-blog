<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Button from "../Button.svelte";
  import { cn } from "$lib/utils/tailwindcss";

  interface Props extends HTMLButtonAttributes {
    submitting?: boolean;
  }

  let {
    submitting = false,
    children,
    class: klass
  }: Props = $props();
</script>

<Button loading={submitting} class={cn("w-full", klass)}>
  {@render children?.()}
</Button>
