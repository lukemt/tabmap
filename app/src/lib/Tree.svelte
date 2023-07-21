<script lang="ts">
  import Tab from "./Tab.svelte";

  import { getCols } from "./getters";
  import type { TabInfo } from "./types";

  export let parent: TabInfo;

  const tabsByCol = getCols(parent, 50);
</script>

<!-- row -->
<div class="flex justify-start gap-16 my-20">
  {#each tabsByCol as tabs}
    <!-- col -->
    <div class="flex flex-col justify-center gap-4">
      {#each tabs as tabInfo}
        <Tab {tabInfo} />
      {/each}
    </div>
  {/each}
</div>
