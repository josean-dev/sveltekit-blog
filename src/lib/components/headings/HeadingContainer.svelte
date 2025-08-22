<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import { type Snippet } from "svelte";

  interface Props {
    underline?: boolean;
    children?: Snippet;
    button?: Snippet;
    class?: string;
  }

  let {
    underline = false,
    children,
    button,
    class: klass
  }: Props = $props();
</script>

<div
  class={cn(
    "p-4 flex items-center justify-between",
    {
      "border-b dark:border-gray-700": underline
    },
    klass
  )}
>
  <div>
    {@render children?.()}
  </div>
  {@render button?.()}
</div>
