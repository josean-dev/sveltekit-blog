<script lang="ts">
  import { Control } from "formsnap";
  import type { ComponentProps } from "svelte";
  import FormLabel from "./FormLabel.svelte";

  let {
    label,
    // Rename the children prop to childrenProp to avoid
    // conflicts with the Control component
    children: childrenProp,
    ...restProps
  }: ComponentProps<typeof Control> & {
    label: string;
  } = $props();
</script>

<Control {...restProps}>
  {#snippet children({ props })}
    <div class="flex flex-col gap-2">
      <FormLabel>{label}</FormLabel>

      {#if childrenProp}
        {@render childrenProp({ props })}
      {/if}
    </div>
  {/snippet}
</Control>
