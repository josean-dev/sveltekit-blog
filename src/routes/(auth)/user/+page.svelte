<script lang="ts">
  import type { PageProps } from "./$types";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import BasicButton from "$lib/components/BasicButton.svelte";
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/authClient";

  let { data }: PageProps = $props();
  let { user } = data;

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          goto("/login"); // redirect to login page
        }
      }
    });
  }
</script>

<div class="max-w-2xl mx-auto">
  <HeadingContainer>
    <H1>User Profile</H1>
  </HeadingContainer>

  <div class="px-4 py-2">
    <div class="space-y-4">
      <div>
        <div
          class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
        >
          Name:
        </div>
        <p class="text-lg text-gray-900 dark:text-white">
          {user.name}
        </p>
      </div>

      <div>
        <div
          class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
        >
          Email:
        </div>
        <p class="text-lg text-gray-900 dark:text-white">
          {user.email}
        </p>
      </div>

      <div>
        <div
          class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
        >
          User ID:
        </div>
        <p
          class="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded text-gray-900 dark:text-white"
        >
          {user.id}
        </p>
      </div>

      {#if user.createdAt}
        <div>
          <div
            class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
          >
            Account Created:
          </div>
          <p class="text-lg text-gray-900 dark:text-white">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      {/if}
    </div>

    <div
      class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
    >
      <BasicButton color="danger" onclick={handleLogout}>
        Logout
      </BasicButton>
    </div>
  </div>
</div>
