<script lang="ts">
  import TabWrapper from "./TabWrapper.svelte";
  import { getChildren } from "./stores/getters";

  import type { Site } from "./types";

  export let parent: Site;

  const children = getChildren(parent.id);
</script>

<div class="flex justify-start items-center gap-28">
  <TabWrapper tabInfo={parent} />
  <div class="flex flex-col gap-4">
    {#each children as child}
      <svelte:self parent={child} />
    {/each}
  </div>
</div>
