<script lang="ts">
  import BasicButton from "$lib/components/BasicButton.svelte";

  interface Props {
    saveDisabled?: boolean;
    saving?: boolean;
    deleting?: boolean;
  }

  let {
    saveDisabled = false,
    saving = false,
    deleting
  }: Props = $props();
</script>

<div class="flex w-full justify-end space-x-2 p-3">
  <BasicButton loading={deleting} color="danger" form="deleteForm">
    Delete
  </BasicButton>
  <BasicButton
    disabled={saveDisabled}
    form="editAddForm"
    loading={saving}
  >
    Save Changes
  </BasicButton>
</div>
