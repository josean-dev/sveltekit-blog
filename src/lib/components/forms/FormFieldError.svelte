<script lang="ts">
  import type { ErrorAttrs } from "formsnap";

  interface Props {
    errorAttrs: ErrorAttrs;
    errorMessage: string;
  }

  let { errorAttrs, errorMessage }: Props = $props();
</script>

<div class="text-red-500 mt-2" {...errorAttrs}>
  {errorMessage}
</div>
