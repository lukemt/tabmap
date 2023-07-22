<script lang="ts">
  import LeaderLine from "leader-line-new";
  import type { TabInfo } from "./types";
  import { onMount } from "svelte";
  import TabMd from "./TabMd.svelte";
  import TabLg from "./TabLg.svelte";

  export let tabInfo: TabInfo;

  const size = Math.random() > 0.2 ? "md" : "lg";

  onMount(() => {
    const startEl = document.getElementById(`tab-${tabInfo.parent}`);
    const endEl = document.getElementById(`tab-${tabInfo.id}`);
    if (!startEl || !endEl) {
      return;
    }

    const leaderLine = new LeaderLine(startEl, endEl, {
      color: "#aaa",
    });
    return () => {
      leaderLine.remove();
    };
  });
</script>

<div id="tab-{tabInfo.id}" class="w-min">
  {#if size === "md"}
    <TabMd {tabInfo} />
  {:else}
    <TabLg {tabInfo} />
  {/if}
</div>
