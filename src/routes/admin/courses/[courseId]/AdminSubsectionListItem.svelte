<script lang="ts">
  import H4 from "$lib/components/headings/H4.svelte";
  import type { SelectSubsection } from "$lib/server/db/schema";
  import { formatHoursMinutesSeconds } from "$lib/utils/time";

  interface Props {
    subsection: Pick<
    SelectSubsection,
    "name" | "videoLength"
  >;
  }

  let { subsection }: Props = $props();
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
