<script lang="ts">
  import { getCols } from "./getters";
  import type { TabInfo } from "./types";

  export let parent: TabInfo;

  const tabsByCol = getCols(parent, 50);

</script>

<!-- row -->
<div class="flex justify-start">
  {#each tabsByCol as tabs}
    <!-- col -->
    <div class="flex flex-col justify-center">
      {#each tabs as tab}
        <!-- tab -->
        <div class="border border-black p-4">
          {tab.title}
        </div>
      {/each}
    </div>
  {/each}
</div>