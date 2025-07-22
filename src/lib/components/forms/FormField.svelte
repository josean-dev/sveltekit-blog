<script lang="ts" module>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { FormPath } from "sveltekit-superforms";

  // the form object
  type T = Record<string, unknown>;
  // the path/name of the field in the form object
  type U = unknown;
</script>

<script
  lang="ts"
  generics="T extends Record<string, unknown>, U extends FormPath<T>"
>
  import FormInputContainer from "./FormInputContainer.svelte";

  import { Field, type FieldProps, FieldErrors } from "formsnap";
  import type { SuperForm } from "sveltekit-superforms";
  import FormFieldError from "./FormFieldError.svelte";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = FieldProps<T, U>;

  interface Props {
    form: SuperForm<T>;
    name: U;
    children?: import('svelte').Snippet<[any]>;
  }

  let { form, name, children }: Props = $props();

  const children_render = $derived(children);
</script>

<!-- passing the slot props down are optional -->
<Field {form} {name}    >
  {#snippet children({ value, errors, tainted, constraints })}
    <FormInputContainer>
      {@render children_render?.({ value, errors, tainted, constraints, })}
      <FieldErrors  >
        {#snippet children({ errors, errorAttrs })}
            {#if errors.length > 0}
            <FormFieldError errorMessage={errors[0]} {errorAttrs} />
          {/if}
                  {/snippet}
        </FieldErrors>
    </FormInputContainer>
  {/snippet}
</Field>
