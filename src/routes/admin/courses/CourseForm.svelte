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

  export let courseForm: SuperValidated<Infer<CourseFormSchema>>;
  export let edit: boolean = false;

  $: initialData = courseForm.data;

  const form = superForm(courseForm, {
    validators: zodClient(courseFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  export let formId = "courseForm";

  const { form: formData, message, enhance, submitting } = form;

  $: dataChanged =
    JSON.stringify($formData) !== JSON.stringify(initialData);
</script>

{#if edit}
  <div class="flex w-full justify-end p-3">
    <Button
      disabled={!dataChanged}
      form={formId}
      loading={$submitting}>Save Changes</Button
    >
  </div>
{/if}

<FormContainer>
  {#if $message}
    <FormError>
      {$message}
    </FormError>
  {/if}
  <form id={formId} method="POST" use:enhance>
    <FormField {form} name="name">
      <FormControl label="Name" let:attrs>
        <Input
          type="text"
          placeholder="Enter the name of the course"
          bind:value={$formData.name}
          {...attrs}
        />
      </FormControl>
    </FormField>

    <FormField {form} name="slug">
      <FormControl label="Slug" let:attrs>
        <Input
          type="text"
          placeholder="Enter a unique slug for the course"
          bind:value={$formData.slug}
          {...attrs}
        />
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
