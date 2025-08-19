<script lang="ts">
  import {
    superForm,
    type Infer,
    type SuperValidated
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import {
    subsectionFormSchema,
    type SubsectionFormSchema
  } from "./subsectionFormSchema";
  import EntityDetailPageSaveButton from "../../../../EntityDetailPageSaveButton.svelte";
  import FormInput from "$lib/components/forms/FormInput.svelte";
  import { isDataChanged } from "$lib/utils/forms";

  interface Props {
    subsectionForm: SuperValidated<Infer<SubsectionFormSchema>>;
    edit?: boolean;
    formId?: string;
  }

  let {
    subsectionForm,
    edit = false,
    formId = "sectionForm"
  }: Props = $props();

  const form = superForm(subsectionForm, {
    validators: zodClient(subsectionFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  const { form: formData, message, enhance, submitting } = form;

  let dataChanged = $derived(
    isDataChanged($formData, subsectionForm.data)
  );
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
      <FormControl label="Name">
        {#snippet children({ props })}
          <FormInput
            type="text"
            placeholder="Enter the name of the subsection"
            bind:value={$formData.name}
            {...props}
          />
        {/snippet}
      </FormControl>
    </FormField>

    <FormField {form} name="slug">
      <FormControl label="Slug">
        {#snippet children({ props })}
          <FormInput
            type="text"
            placeholder="Enter a unique slug for the subsection"
            bind:value={$formData.slug}
            {...props}
          />
        {/snippet}
      </FormControl>
    </FormField>

    <FormField {form} name="vimeoVideoId">
      <FormControl label="Vimeo Video Id">
        {#snippet children({ props })}
          <FormInput
            type="text"
            placeholder="Enter the vimeo video id"
            bind:value={$formData.vimeoVideoId}
            {...props}
          />
        {/snippet}
      </FormControl>
    </FormField>

    <FormField {form} name="videoLength">
      <FormControl label="Video Length">
        {#snippet children({ props })}
          <FormInput
            type="number"
            placeholder="Enter the video length in seconds"
            bind:value={$formData.videoLength}
            {...props}
          />
        {/snippet}
      </FormControl>
    </FormField>

    {#if !edit}
      <FormSubmitButtonContainer>
        <FormSubmitButton submitting={$submitting}>
          Create Subsection
        </FormSubmitButton>
      </FormSubmitButtonContainer>
    {/if}
  </form>
</FormContainer>
