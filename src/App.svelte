<script lang="ts">
  import Counter from "./lib/uiComponents/Counter.svelte";
  import Tree from "./lib/uiComponents/Tree.svelte";
  import { getPageTree } from "./lib/stores/getters";
  import FocusOverlay from "./lib/uiComponents/FocusOverlay.svelte";
  import DenseTree from "./lib/uiComponents/DenseTree.svelte";

  const pageTrees = getPageTree(1);
</script>

<FocusOverlay />

<main class="theme-default">
  <div class="card">
    <Counter />

    {#each pageTrees as tree}
      <div class="my-16">
        <!-- <DenseTree parent={tree} /> -->
        <Tree page={tree} />
      </div>
    {/each}
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

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
