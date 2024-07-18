<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import PlusIcon from "$lib/components/svg/PlusIcon.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import Td from "$lib/components/table/Td.svelte";
  import Th from "$lib/components/table/Th.svelte";
  import { formatDateShort } from "$lib/utils/dates";
  import type { PageData } from "./$types";

  export let data: PageData;

  const { courses, coursesCount } = data;
</script>

<div>
  <HeadingContainer>
    <H1>Courses</H1>
    <Button href="/admin/courses/add" slot="button">
      <PlusIcon class="size-5 fill-current" />
      <span>Add Course</span>
    </Button>
  </HeadingContainer>

  <Table>
    <thead>
      <tr>
        <Th>Name</Th>
        <Th>Slug</Th>
        <Th>Sections</Th>
        <Th>Created At</Th>
        <Th>Updated At</Th>
      </tr>
    </thead>
    <tbody>
      {#each courses as course}
        {@const href = `/admin/courses/${course.slug}`}
        <tr>
          <Td {href}>{course.name}</Td>
          <Td {href}>{course.slug}</Td>
          <Td {href}>{course.sectionsCount}</Td>
          <Td {href}>{formatDateShort(course.createdAt)}</Td>
          <Td {href}>{formatDateShort(course.updatedAt)}</Td>
        </tr>
      {/each}
    </tbody>
  </Table>
</div>
