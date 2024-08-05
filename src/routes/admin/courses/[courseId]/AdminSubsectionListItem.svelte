<script lang="ts">
  import H4 from "$lib/components/headings/H4.svelte";
  import type { SelectSubsection } from "$lib/server/db/schema";
  import { formatHoursMinutesSeconds } from "$lib/utils/time";

  export let subsection: Pick<
    SelectSubsection,
    "name" | "videoLength"
  >;
</script>

<li>
  <div>
    <H4>{subsection.name}</H4>
  </div>

  {#if subsection.videoLength}
    <div>
      {formatHoursMinutesSeconds(subsection.videoLength, true)}
    </div>
  {/if}
</li>
