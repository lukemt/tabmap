<script lang="ts">
  import Counter from "./lib/uiComponents/Counter.svelte";
  import Tree from "./lib/uiComponents/Tree.svelte";
  import FocusOverlay from "./lib/uiComponents/FocusOverlay.svelte";
  import { pagesStore, TOP_LEVEL_PAGE_ID } from "./lib/stores/pagesStore";

  let topLevelPage = pagesStore.getSubscribablePage(TOP_LEVEL_PAGE_ID);

  let showMap = true;

  const handleLol = () => {
    pagesStore.set(101, {
      ...pagesStore.get(101)!,
      title: "lol",
      childrenIds: [102],
    });
  };
</script>

<FocusOverlay />

<main class="theme-default">
  <div class="card">
    <Counter /><br />
    <button class="button" on:click={handleLol}> lol </button><br />
    <button class="button" on:click={() => (showMap = !showMap)}>
      toggle
    </button><br />

    {#if showMap}
      {#each $topLevelPage.childrenIds as id (id)}
        <div class="my-16">
          <!-- <DenseTree parent={tree} /> -->
          <Tree pageId={id} parentId={1} />
        </div>
      {/each}
    {/if}
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>
