<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  const { courses, coursesCount } = data;

  $: console.log(courses, coursesCount);
</script>

<div>
  <div class="py-2 px-4 border-b dark:border-gray-700">
    <h2>Courses</h2>
  </div>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Slug</th>
        <th>Sections</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {#each courses as course}
        <tr>
          <td>{course.name}</td>
          <td>{course.slug}</td>
          <td>{course.sectionsCount}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
