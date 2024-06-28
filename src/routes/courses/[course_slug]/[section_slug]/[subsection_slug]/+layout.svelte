<script lang="ts">
  import { page } from "$app/stores";
  import PageTransition from "$lib/components/PageTransition.svelte";
  import DottedCircleIcon from "$lib/components/svg/DottedCircleIcon.svelte";
  import PlayVideoIcon from "$lib/components/svg/PlayVideoIcon.svelte";
  import { cn } from "$lib/utils/tailwindcss";
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
      class="sticky left-0 top-20 h-screen w-82 overflow-y-scroll pb-28"
    >
      <ul class="text-gray-400 w-80">
        {#each course.sections as section}
          {@const sectionActive = section.slug === sectionSlug}
          <li>
            <h3
              class={cn({
                "border-b border-dashed px-3 py-3.5 text-lg font-black": true,
                "dark:border-gray-700": !sectionActive,
                "text-purple-500 border-purple-700": sectionActive
              })}
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
                    class={cn({
                      "flex items-center justify-between py-2 pl-3 pr-3": true,
                      "dark:hover:text-gray-100 hover:text-gray-600 ":
                        !subsectionActive,
                      "font-semibold text-purple-500":
                        subsectionActive
                    })}
                  >
                    <div class="flex items-center space-x-2">
                      <DottedCircleIcon class="size-5 fill-current" />
                      <span>
                        {subsection.name}
                      </span>
                    </div>
                    {#if subsection.videoLength}
                      <div>
                        {formatHoursMinutesSeconds(
                          subsection.videoLength,
                          true
                        )}
                      </div>
                    {/if}
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
      <div class="px-4 pb-10 pt-4">
        <slot />
      </div>
    </PageTransition>
  </div>
</div>
