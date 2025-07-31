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
  import { Field, type FieldProps, FieldErrors } from "formsnap";

  import FormFieldError from "./FormFieldError.svelte";
  import FormInputContainer from "./FormInputContainer.svelte";

  let {
    form,
    name,
    children: childrenProp
  }: FieldProps<T, U> = $props();
</script>

<!-- passing the slot props down are optional -->
<Field {form} {name}>
  {#snippet children(snippetProps)}
    <FormInputContainer>
      {#if childrenProp}
        {@render childrenProp(snippetProps)}
      {/if}
      <FieldErrors>
        {#snippet children({ errors, errorProps })}
          {#if errors.length > 0}
            <FormFieldError errorMessage={errors[0]} {errorProps} />
          {/if}
        {/snippet}
      </FieldErrors>
    </FormInputContainer>
  {/snippet}
</Field>
