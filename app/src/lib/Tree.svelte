<script lang="ts">
  import { getCols } from "./getters";
  import type { TabInfo } from "./types";

  export let parent: TabInfo;

  const tabsByCol = getCols(parent, 50);

</script>

<div class="flexbox">
  {#each tabsByCol as tabs}
    <div class="col">
      {#each tabs as tab}
        <div class="tab">
          {tab.title}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .flexbox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .tab {
    border: 1px solid black;
    padding: 1rem;
  }
</style>