<script lang="ts">
  import Label from "$lib/components/forms/Label.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import FormInputContainer from "$lib/components/forms/FormInputContainer.svelte";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import FormFieldError from "$lib/components/forms/FormFieldError.svelte";
  import FormPage from "$lib/components/forms/FormPage.svelte";
  import { addCourseFormSchema } from "./addCourseFormSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";

  export let data: PageData;

  const { form, errors, message, enhance, submitting } = superForm(
    data.form,
    {
      validators: zodClient(addCourseFormSchema),
      validationMethod: "oninput"
    }
  );
</script>

<FormPage>
  <HeadingContainer>
    <H1>Add New Course</H1>
  </HeadingContainer>

  <FormContainer>
    {#if $message}
      <FormError>
        {$message}
      </FormError>
    {/if}
    <form method="POST" use:enhance>
      <FormInputContainer>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter the name of the course"
          aria-invalid={$errors.name ? "true" : undefined}
          bind:value={$form.name}
        />
        {#if $errors.name}
          <FormFieldError>{$errors.name[0]}</FormFieldError>
        {/if}
      </FormInputContainer>
      <FormInputContainer>
        <Label for="slug">Slug</Label>
        <Input
          type="text"
          name="slug"
          placeholder="Enter a unique slug for the course"
          aria-invalid={$errors.slug ? "true" : undefined}
          bind:value={$form.slug}
        />
        {#if $errors.slug}
          <FormFieldError>{$errors.slug[0]}</FormFieldError>
        {/if}
      </FormInputContainer>

      <FormSubmitButtonContainer>
        <FormSubmitButton submitting={$submitting}>
          Create Course
        </FormSubmitButton>
      </FormSubmitButtonContainer>
    </form>
  </FormContainer>
</FormPage>
