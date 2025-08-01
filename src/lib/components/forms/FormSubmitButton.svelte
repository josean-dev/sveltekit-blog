<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils/tailwindcss";
  import BasicButton from "../BasicButton.svelte";

  interface Props extends HTMLButtonAttributes {
    submitting?: boolean;
  }

  let {
    submitting = false,
    children,
    class: klass
  }: Props = $props();
</script>

<BasicButton loading={submitting} class={cn("w-full", klass)}>
  {@render children?.()}
</BasicButton>
