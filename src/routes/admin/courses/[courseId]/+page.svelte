<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import pluralize from "pluralize";
  import type { PageData } from "./$types";
  import CourseForm from "../CourseForm.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import H3 from "$lib/components/headings/H3.svelte";
  import H4 from "$lib/components/headings/H4.svelte";
  import { formatHoursMinutesSeconds } from "$lib/utils/time";

  export let data: PageData;

  $: ({ course, sections, form } = data);
</script>

{#if course && sections}
  <HeadingContainer underline>
    <H1>{course.name}</H1>
  </HeadingContainer>

  <CourseForm edit courseForm={form} />

  <div class="px-4">
    <HeadingContainer underline>
      <H2>Sections</H2>
    </HeadingContainer>
    <ul>
      {#each sections as section}
        <li class="dark:text-gray-300">
          <div
            class="flex items-center justify-between p-4
                   border-b border-dashed dark:border-gray-700"
          >
            <div>
              <H3>
                {section.name}
              </H3>
              <p class="font-light">
                {pluralize(
                  "subsections",
                  section.subsections.length,
                  true
                )}
              </p>
            </div>
          </div>
          <ul>
            {#each section.subsections as subsection}
              <li>
                <div>
                  <H4>{subsection.name}</H4>
                </div>
                {#if subsection.videoLength}
                  <div>
                    {formatHoursMinutesSeconds(
                      subsection.videoLength,
                      true
                    )}
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
          <div
            class="py-4 border-b border-dashed dark:border-gray-700"
          >
            <Button
              slot="button"
              href="/admin/courses/{course.id}/sections/{section.id}/subsections/add"
              outline
              color="secondary"
            >
              + Add Subsection
            </Button>
          </div>
        </li>
      {/each}
    </ul>
    <div class="py-4">
      <Button
        slot="button"
        href="/admin/courses/{course.id}/sections/add"
        outline
        color="primary"
      >
        + Add Section
      </Button>
    </div>
  </div>
{/if}
