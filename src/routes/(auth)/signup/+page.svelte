<script lang="ts">
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageProps } from "./$types";
  import { signupFormSchema } from "./signupFormSchema";
  import { superForm } from "sveltekit-superforms";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import FormInput from "$lib/components/forms/FormInput.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import BasicButton from "$lib/components/BasicButton.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";

  let { data }: PageProps = $props();

  let { signupForm } = data;

  const form = superForm(signupForm, {
    validators: zodClient(signupFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<div class="max-w-2xl mx-auto">
  <HeadingContainer>
    <H1>Sign Up</H1>
  </HeadingContainer>

  <FormContainer>
    {#if $message}
      <FormError>
        {$message}
      </FormError>
    {/if}

    <form method="POST" use:enhance>
      <FormField {form} name="name">
        <FormControl label="Full Name">
          {#snippet children({ props })}
            <FormInput
              type="text"
              placeholder="Enter your full name"
              bind:value={$formData.name}
              {...props}
            />
          {/snippet}
        </FormControl>
      </FormField>

      <FormField {form} name="email">
        <FormControl label="Email">
          {#snippet children({ props })}
            <FormInput
              type="email"
              placeholder="Enter your email"
              bind:value={$formData.email}
              {...props}
            />
          {/snippet}
        </FormControl>
      </FormField>

      <FormField {form} name="password">
        <FormControl label="Password">
          {#snippet children({ props })}
            <FormInput
              type="password"
              placeholder="Enter your password"
              bind:value={$formData.password}
              {...props}
            />
          {/snippet}
        </FormControl>
      </FormField>

      <FormField {form} name="confirmPassword">
        <FormControl label="Confirm Password">
          {#snippet children({ props })}
            <FormInput
              type="password"
              placeholder="Confirm your password"
              bind:value={$formData.confirmPassword}
              {...props}
            />
          {/snippet}
        </FormControl>
      </FormField>

      <FormSubmitButtonContainer>
        <BasicButton color="neutral" loading={$submitting}>
          Sign Up
        </BasicButton>
      </FormSubmitButtonContainer>
    </form>
  </FormContainer>

  <p class="px-4">
    Already have an account? <a
      href="/login"
      class="underline text-sky-400">Login</a
    >
  </p>
</div>
