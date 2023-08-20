<script lang="ts">
  import LeaderLine from "leader-line-new";
  import type { Page } from "./types";
  import { onMount } from "svelte";
  import TabMd from "./TabMd.svelte";
  import TabLg from "./TabLg.svelte";
  import TabXs from "./TabXs.svelte";
  import TabSm from "./TabSm.svelte";

  export let tabInfo: Page;

  const size = Math.floor(Math.random() * 4 + 1);

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
  {#if size === 1}
    <TabXs {tabInfo} />
  {:else if size === 2}
    <TabSm {tabInfo} />
  {:else if size === 3}
    <TabMd {tabInfo} />
  {:else}
    <TabLg {tabInfo} />
  {/if}
</div>
