<script lang="ts">
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageProps } from "./$types";
  import { loginFormSchema } from "./loginFormSchema";
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

  let { loginForm } = data;

  const form = superForm(loginForm, {
    validators: zodClient(loginFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<div class="max-w-2xl mx-auto">
  <HeadingContainer>
    <H1>Login</H1>
  </HeadingContainer>

  <FormContainer>
    {#if $message}
      <FormError>
        {$message}
      </FormError>
    {/if}

    <form method="POST" use:enhance>
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

      <FormSubmitButtonContainer>
        <BasicButton color="neutral" loading={$submitting}>
          Login
        </BasicButton>
      </FormSubmitButtonContainer>
    </form>
  </FormContainer>

  <p class="px-4">
    Don't have an account yet? <a
      href="/signup"
      class="underline text-sky-400">Sign Up</a
    >
  </p>
</div>
