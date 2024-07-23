<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { addSectionFormSchema } from "./addSectionFormSchema";
  import FormPage from "$lib/components/forms/FormPage.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import FormInputContainer from "$lib/components/forms/FormInputContainer.svelte";
  import Label from "$lib/components/forms/Label.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import FormFieldError from "$lib/components/forms/FormFieldError.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import H2 from "$lib/components/headings/H2.svelte";

  export let data: PageData;

  const { course } = data;

  const { form, errors, message, enhance, submitting } = superForm(
    data.form,
    {
      validators: zodClient(addSectionFormSchema),
      validationMethod: "oninput"
    }
  );
</script>

{#if course}
  <FormPage>
    <HeadingContainer underline>
      <H1>{course.name}</H1>
    </HeadingContainer>

    <HeadingContainer>
      <H2>Add New Section</H2>
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
            placeholder="Enter the name of the section"
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
            placeholder="Enter a unique slug for the section"
            aria-invalid={$errors.slug ? "true" : undefined}
            bind:value={$form.slug}
          />
          {#if $errors.slug}
            <FormFieldError>{$errors.slug[0]}</FormFieldError>
          {/if}
        </FormInputContainer>

        <Input type="hidden" name="courseId" value={course.id} />
        <Input type="hidden" name="courseSlug" value={course.slug} />

        <FormSubmitButtonContainer>
          <FormSubmitButton submitting={$submitting}>
            Create Section
          </FormSubmitButton>
        </FormSubmitButtonContainer>
      </form>
    </FormContainer>
  </FormPage>
{/if}
