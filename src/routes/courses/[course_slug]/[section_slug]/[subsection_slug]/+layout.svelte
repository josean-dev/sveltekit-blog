<script lang="ts">
  import { page } from "$app/stores";
  import PageTransition from "$lib/components/PageTransition.svelte";
  import RoundPlayVideoIcon from "$lib/components/svg/RoundPlayVideoIcon.svelte";
  import { formatHoursMinutesSeconds } from "$lib/utils/time";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: ({ section_slug: sectionSlug, subsection_slug: subsectionSlug } =
    $page.params);

  const course = data.course;
</script>

<div class="flex">
  {#if course}
    <nav
      class="sticky left-0 top-20 h-screen w-64 overflow-y-scroll bg-gray-50 pb-28 dark:bg-dark-blue-800"
    >
      <ul class="text-gray-400">
        {#each course.sections as section}
          {@const sectionActive = section.slug === sectionSlug}
          <li>
            <h3
              class={`border-b px-3 py-3.5 text-lg font-black dark:border-gray-800
                     ${
                       sectionActive && "text-black dark:text-white"
                     }`}
            >
              {section.name}
            </h3>
            <ul>
              {#each section.subsections as subsection}
                {@const subsectionActive =
                  subsection.slug === subsectionSlug}
                <li>
                  <a
                    href={`/courses/${course.slug}/${section.slug}/${subsection.slug}`}
                    class={`block py-2 pl-6 pr-4 font-medium hover:bg-gray-200 hover:text-black
                          dark:hover:bg-dark-blue-600 dark:hover:text-white
                          ${
                            subsectionActive &&
                            "bg-gray-200 font-semibold text-black dark:bg-dark-blue-600 dark:text-white"
                          }`}
                  >
                    <span class="block">
                      {subsection.name}
                    </span>
                    <span
                      class="flex flex-1 items-center space-x-1 font-light"
                    >
                      {#if subsection.videoLength}
                        <RoundPlayVideoIcon
                          class="h-3.5 w-3.5 fill-current"
                        />
                        <span>
                          {formatHoursMinutesSeconds(
                            subsection.videoLength
                          )}
                        </span>
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

  <div class="flex-1">
    <PageTransition pagePath={data.pathname}>
      <div class="px-4 pb-28 pt-4">
        <slot />
      </div>
    </PageTransition>
  </div>
</div>
