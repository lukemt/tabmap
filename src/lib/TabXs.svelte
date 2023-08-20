<script lang="ts">
  import type { Site } from "./types";

  export let tabInfo: Site;
</script>

<div
  id="tab-{tabInfo.id}"
  class="flex w-min items-center gap-3 py-2 px-4 rounded-lg glass"
>
  <div class="w-6 h-6 overflow-hidden">
    <img src={tabInfo.favIconUrl} class="w-6 h-6 mr-2" alt={tabInfo.title} />
  </div>
</div>
