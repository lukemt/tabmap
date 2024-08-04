<script lang="ts">
  import TabWrapper from "./TabWrapper.svelte";

  import type { PageTree } from "../types";

  export let page: PageTree;
</script>

<div class="flex justify-start items-center gap-28">
  <TabWrapper {page} />
  <div class="flex flex-col gap-4">
    {#each page.children as child}
      <svelte:self page={child} />
    {/each}
  </div>
</div>
