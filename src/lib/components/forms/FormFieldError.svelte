<script lang="ts">
  import type { ErrorAttrs } from "formsnap";

  export let errorAttrs: ErrorAttrs;
  export let errorMessage: string;
</script>

<div class="text-red-500 mt-2" {...errorAttrs}>
  {errorMessage}
</div>
