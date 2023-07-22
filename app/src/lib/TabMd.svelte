<script lang="ts">
  import type { TabInfo } from "./types";

  export let tabInfo: TabInfo;
</script>

<div
  id="tab-{tabInfo.id}"
  class="flex w-min items-center gap-4 py-2 px-4 rounded-lg shadow-md bg-white dark:bg-black"
>
  <div class="w-6 h-6 overflow-hidden">
    <img src={tabInfo.favIconUrl} class="w-6 h-6 mr-2" alt="" />
  </div>
  <div class="text-left w-52">
    <p class="truncate">
      {tabInfo.title}
    </p>
    <p class="truncate">
      {tabInfo.url}
    </p>
  </div>
</div>
