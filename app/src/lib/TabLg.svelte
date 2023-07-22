<script lang="ts">
  import type { TabInfo } from "./types";

  export let tabInfo: TabInfo;
</script>

<div
  id="tab-{tabInfo.id}"
  class="flex items-center gap-8 py-2 px-4 rounded-lg shadow-md bg-white dark:bg-black"
>
  <div class="w-12 h-12 overflow-hidden">
    <img src={tabInfo.favIconUrl} class="w-12 h-12 mr-2" alt="" />
  </div>
  <div class="text-left w-72">
    <p class="truncate text-3xl">
      {tabInfo.title}
    </p>
    <p class="truncate">
      {tabInfo.url}
    </p>
  </div>
</div>
