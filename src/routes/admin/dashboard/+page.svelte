<script lang="ts">
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
    <Button slot="button">
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
        <tr>
          <Td>{course.name}</Td>
          <Td>{course.slug}</Td>
          <Td>{course.sectionsCount}</Td>
          <Td>{formatDateShort(course.createdAt)}</Td>
          <Td>{formatDateShort(course.updatedAt)}</Td>
        </tr>
      {/each}
    </tbody>
  </Table>
</div>
