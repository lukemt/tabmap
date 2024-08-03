<script lang="ts">
  import TabWrapper from "./TabWrapper.svelte";

  import { getCols } from "./stores/getters";
  import type { Page } from "./types";

  export let parent: Page;

  const tabsByCol = getCols(parent, 50);
</script>

<!-- row -->
<div class="flex justify-start gap-28 my-20">
  {#each tabsByCol as tabs}
    <!-- col -->
    <div class="flex flex-col justify-center items-center gap-4">
      {#each tabs as tabInfo}
        <TabWrapper page={tabInfo} />
      {/each}
    </div>
  {/each}
</div>
