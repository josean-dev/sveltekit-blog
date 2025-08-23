<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import { Button } from "bits-ui";
  import LoadingSpinnerIcon from "./svg/LoadingSpinnerIcon.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    color?: "primary" | "secondary" | "neutral" | "danger";
    outline?: boolean;
    dashedOutline?: boolean;
    loading?: boolean;
    disabled?: boolean;
    href?: string;
    icon?: Snippet;
    children?: Snippet;
    onclick?: () => void;
    form?: string;
  }

  let {
    class: klass = "",
    color = "primary",
    outline = false,
    dashedOutline = false,
    loading = false,
    icon,
    children,
    onclick,
    disabled,
    href,
    form
  }: Props = $props();
</script>

<Button.Root
  class={cn(
    "relative block",
    "px-3 py-2 text-white rounded-md",
    "font-medium",
    "disabled:bg-slate-200 disabled:text-slate-400",
    "dark:disabled:bg-slate-700 dark:disabled:text-slate-500",
    {
      "hover:text-white": outline,
      "bg-sky-500 hover:bg-sky-600": color === "primary" && !outline,
      "border-2 border-sky-500 hover:bg-sky-500 text-sky-500":
        color === "primary" && outline,
      "bg-indigo-400 hover:bg-indigo-500":
        color === "secondary" && !outline,
      "border-2 border-indigo-400 hover:bg-indigo-400 text-indigo-400":
        color === "secondary" && outline,
      "bg-black hover:bg-slate-700 dark:bg-white dark:hover:bg-slate-300 text-white dark:text-black":
        color === "neutral" && !outline,
      "border-2 border-black hover:bg-black dark:border-white dark:hover:bg-white text-black hover:text-white dark:text-white dark:hover:text-black":
        color === "neutral" && outline,
      "bg-red-500 hover:bg-red-600": color === "danger" && !outline,
      "border-2 border-red-500 hover:bg-red-500 text-red-500":
        color === "danger" && outline,
      "border-dashed": dashedOutline
    },
    klass
  )}
  {onclick}
  {disabled}
  {href}
  {form}
>
  <div
    class={cn({
      invisible: loading,
      "flex items-center justify-center space-x-2": true
    })}
  >
    {@render icon?.()}
    {@render children?.()}
  </div>

  <div
    class={cn({
      "absolute inset-0 flex items-center justify-center": loading,
      hidden: !loading
    })}
  >
    <LoadingSpinnerIcon
      class="size-7 fill-current animate-spin-slower"
    />
  </div>
</Button.Root>
