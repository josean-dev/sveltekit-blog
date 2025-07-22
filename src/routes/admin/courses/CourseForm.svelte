<script lang="ts">
  import {
    type SuperValidated,
    type Infer,
    superForm
  } from "sveltekit-superforms";
  import {
    courseFormSchema,
    type CourseFormSchema
  } from "./courseFormSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import Button from "$lib/components/Button.svelte";
  import EntityDetailPageSaveButton from "./EntityDetailPageSaveButton.svelte";



  const form = superForm(courseForm, {
    validators: zodClient(courseFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  interface Props {
    courseForm: SuperValidated<Infer<CourseFormSchema>>;
    edit?: boolean;
    formId?: string;
  }

  let { courseForm, edit = false, formId = "courseForm" }: Props = $props();

  const { form: formData, message, enhance, submitting } = form;

  let initialData = $derived(courseForm.data);
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
            placeholder="Enter the name of the course"
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
            placeholder="Enter a unique slug for the course"
            bind:value={$formData.slug}
            {...attrs}
          />
                      {/snippet}
            </FormControl>
    </FormField>

    <Input type="hidden" name="id" value={$formData.id} />

    {#if !edit}
      <FormSubmitButtonContainer>
        <Button class="w-full" loading={$submitting}>
          Create Course
        </Button>
      </FormSubmitButtonContainer>
    {/if}
  </form>
</FormContainer>
