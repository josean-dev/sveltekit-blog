<script lang="ts">
  import { Control, Label, type ControlProps } from "formsnap";
  import FormLabel from "./FormLabel.svelte";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  type $$Props = ControlProps & {
    label: string;
  };

  interface Props {
    label: string;
    children?: import('svelte').Snippet<[any]>;
    [key: string]: any
  }

  let { label, children, ...rest }: Props = $props();

  const children_render = $derived(children);
</script>

<Control  {...rest}>
  {#snippet children({ attrs })}
    <div class="flex flex-col gap-2">
      <Label asChild >
        {#snippet children({ labelAttrs })}
            <FormLabel {...labelAttrs}>{label}</FormLabel>
                  {/snippet}
        </Label>

      {@render children_render?.({ attrs, })}
    </div>
  {/snippet}
</Control>
