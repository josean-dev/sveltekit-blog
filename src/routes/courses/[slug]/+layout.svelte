<script lang="ts">
  import { page } from "$app/stores";
  import PageTransition from "$lib/components/PageTransition.svelte";
  import { formatHoursMinutesSeconds } from "$lib/utils/time";
  import type { LayoutData } from "./$types";

  $: ({ section_slug: sectionSlug, subsection_slug: subsectionSlug } =
    $page.params);

  export let data: LayoutData;
</script>

{#if data.course}
  <nav
    class="fixed left-0 top-20 h-screen w-48 overflow-y-auto bg-gray-100 dark:bg-dark-blue-700"
  >
    <ul class="text-gray-400">
      {#each data.course.sections as section}
        {@const sectionActive = section.slug === sectionSlug}
        <li>
          <h3
            class={`block border-b border-gray-600 px-3 py-2 font-black
                    ${sectionActive && "text-white"}`}
          >
            {section.name}
          </h3>
          <ul>
            {#each section.subsections as subsection}
              {@const subsectionActive =
                subsection.slug === subsectionSlug}
              <li>
                <a
                  href={`/courses/${data.course.slug}/${section.slug}/${subsection.slug}`}
                  class={`ml-4 block px-3 py-2 ${
                    subsectionActive && "font-semibold text-white"
                  }`}
                >
                  <span class="block">{subsection.name}</span>
                  <span
                    class={`block font-light ${
                      subsectionActive
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {#if subsection.videoLength}
                      {formatHoursMinutesSeconds(
                        subsection.videoLength
                      )}
                    {/if}
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<PageTransition pagePath={data.pathname}>
  <div class="ml-48 px-4">
    <slot />
  </div>
</PageTransition>
