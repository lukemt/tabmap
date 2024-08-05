<script lang="ts">
  /**
   * Displays an overlay when the app has lost the keyboard focus,
   * but the user is interacting via keyboard shortcuts.
   *
   * This is a workaround for a problem that occurs when the user
   * sets their curet to the address bar.
   *
   * The overlay is displayed when the app receives a message from
   * the background script. The background script sends a message
   * when the user presses the keyboard shortcut.
   *
   * The overlay is removed when the user clicks on it or when the
   * tab gains focus.
   *
   * The timeout is used to prevent clicks on the underlying page
   * from being received by the overlay.
   */
  import browser from "webextension-polyfill";

  let showOverlay = false;

  // if window gets focus log it
  window.addEventListener("focus", () => {
    // Hint: The timeout prevents clicks to be received by the underlying page.
    setTimeout(() => {
      if (showOverlay && document.hasFocus()) {
        console.log("Window focus detected");
        showOverlay = false;
      }
    }, 200);
  });

  // message listener
  browser.runtime.onMessage.addListener((payload) => {
    console.log(`Message detected`, payload);
    if (payload.message === "activate") {
      if (!document.hasFocus()) {
        window.focus();
        showOverlay = true;
      }
    }
  });
</script>

{#if showOverlay}
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-md z-50 cursor-pointer"
  >
    <p class="text-white text-3xl text-center">
      Click here or press Enter

      <br />
      <br />
      <span class="text-lg">
        ... to restore the keyboard focus of the tab
      </span>
    </p>
  </div>
{/if}
