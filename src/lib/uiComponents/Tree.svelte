<script lang="ts">
  import { pagesStore } from "../stores/pagesStore";
  import TabWrapper from "./TabWrapper.svelte";

  export let pageId: number;
  export let parentId: number;
  let page = pagesStore.getSubscribablePage(pageId);
</script>

<div class="flex justify-start items-center gap-28">
  <TabWrapper page={$page} {parentId} />
  <div class="flex flex-col gap-4">
    {#each $page.navigatedToIds as id (id)}
      <svelte:self pageId={id} parentId={pageId} />
    {/each}
    {#each $page.childrenIds as childId (childId)}
      <svelte:self pageId={childId} parentId={pageId} />
    {/each}
  </div>
</div>
