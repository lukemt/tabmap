<script lang="ts">
  import LeaderLine from "leader-line-new";
  import type { Page } from "./types";
  import { onMount } from "svelte";
  import TabMd from "./TabMd.svelte";
  import TabLg from "./TabLg.svelte";
  import TabXs from "./TabXs.svelte";
  import TabSm from "./TabSm.svelte";

  export let page: Page;

  const size = Math.floor(Math.random() * 4 + 1);

  onMount(() => {
    const startEl = document.getElementById(`tab-${page.parent}`);
    const endEl = document.getElementById(`tab-${page.id}`);
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

<div id="tab-{page.id}" class="w-min">
  {#if size === 1}
    <TabXs tabInfo={page} />
  {:else if size === 2}
    <TabSm tabInfo={page} />
  {:else if size === 3}
    <TabMd tabInfo={page} />
  {:else}
    <TabLg tabInfo={page} />
  {/if}
</div>
