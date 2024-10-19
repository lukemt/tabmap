<script lang="ts">
  import LeaderLine from "leader-line-new";
  import type { Page } from "../types";
  import { onMount } from "svelte";
  import TabMd from "./TabMd.svelte";
  import TabLg from "./TabLg.svelte";
  import TabXs from "./TabXs.svelte";
  import TabSm from "./TabSm.svelte";
  import { openTabAction } from "../uiActions";
  import { pagesStore } from "../stores/pagesStore";

  export let page: Page;
  export let parentId: number;

  const size = Math.floor(Math.random() * 4 + 1);

  onMount(() => {
    const startEl = document.getElementById(`tab-${parentId}`);
    const endEl = document.getElementById(`tab-${page.id}`);
    if (!startEl || !endEl) {
      return;
    }

    let leaderLine = new LeaderLine(startEl, endEl, {
      color: "#aaa",
    });

    const rePosition = () => {
      leaderLine.position();
    };
    pagesStore.addMutationListener(rePosition);

    return () => {
      pagesStore.removeMutationListener(rePosition);
      leaderLine.remove(); // Cleanup LeaderLine
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="tab-{page.id}" class="w-min" on:click={() => openTabAction(page)}>
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
