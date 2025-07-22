<script lang="ts">
  import {
    superForm,
    type Infer,
    type SuperValidated
  } from "sveltekit-superforms";
  import {
    sectionFormSchema,
    type SectionFormSchema
  } from "./sectionFormSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import EntityDetailPageSaveButton from "../../EntityDetailPageSaveButton.svelte";



  const form = superForm(sectionForm, {
    validators: zodClient(sectionFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  interface Props {
    sectionForm: SuperValidated<Infer<SectionFormSchema>>;
    edit?: boolean;
    formId?: string;
  }

  let { sectionForm, edit = false, formId = "sectionForm" }: Props = $props();

  const { form: formData, message, enhance, submitting } = form;

  let initialData = $derived(sectionForm.data);
  let dataChanged =
    $derived(JSON.stringify($formData) !== JSON.stringify(initialData));
</script>

{#if edit}
  <EntityDetailPageSaveButton
    disabled={!dataChanged}
    {formId}
    saving={$submitting}
  />
{/if}

<FormContainer>
  {#if $message}
    <FormError>
      {$message}
    </FormError>
  {/if}

  <form id={formId} method="POST" use:enhance>
    <FormField {form} name="name">
      <FormControl label="Name" >
        {#snippet children({ attrs })}
                <Input
            type="text"
            placeholder="Enter the name of the section"
            bind:value={$formData.name}
            {...attrs}
          />
                      {/snippet}
            </FormControl>
    </FormField>

    <FormField {form} name="slug">
      <FormControl label="Slug" >
        {#snippet children({ attrs })}
                <Input
            type="text"
            placeholder="Enter a unique slug for the section"
            bind:value={$formData.slug}
            {...attrs}
          />
                      {/snippet}
            </FormControl>
    </FormField>

    <Input type="hidden" name="id" value={$formData.id} />

    {#if !edit}
      <FormSubmitButtonContainer>
        <FormSubmitButton submitting={$submitting}>
          Create Section
        </FormSubmitButton>
      </FormSubmitButtonContainer>
    {/if}
  </form>
</FormContainer>
