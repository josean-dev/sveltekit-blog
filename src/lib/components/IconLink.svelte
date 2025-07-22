<script lang="ts">
  interface Props {
    href: string;
    target?: "_self" | "_blank";
    children?: import('svelte').Snippet;
  }

  let { href, target = "_self", children }: Props = $props();
</script>

<a
  class="rounded-lg p-2 text-gray-700 hover:bg-gray-100
  dark:text-white dark:hover:bg-gray-800"
  {href}
  {target}
>
  {@render children?.()}
</a>
