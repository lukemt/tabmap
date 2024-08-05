<script lang="ts">
  // ignore all any errors in this file
  // @ts-nocheck
  import { onMount } from "svelte";
  import browser from "webextension-polyfill";

  let count: number = 0;
  const increment = () => {
    count += 1;
  };

  onMount(() => {
    // listen for keyboard shortcut
    console.log("adding keyboard shortcut listener");

    // command listener
    const commandListener = (command) => {
      console.log(`Command detected: ${command}`);
      if (command === "open-app") {
        increment();
      }
    };
    browser.commands.onCommand.addListener(commandListener);

    // message listener
    const messageListener = (payload) => {
      console.log(`Message detected`, payload);
      if (payload.message === "activate") {
        increment();
        if (!document.hasFocus()) {
          window.focus();
          // alert(
          //   "TabMap lost the keyboard focus. \n\nClick 'ok' to bring it back."
          // );
          console.log("TabMap lost the keyboard focus.");
        }
      }
    };
    browser.runtime.onMessage.addListener(messageListener);

    // keyboard shortcut
    const keyboardListener = (event) => {
      console.log(`Keyboard event detected: ${event}`);
      if (event.key === "o") {
        increment();
        console.log("Keyboard shortcut detected: Ctrl+O");
      }
    };
    window.addEventListener("keydown", keyboardListener);

    // keyup listener
    const keyupListener = (event) => {
      console.log(`Keyboard event detected: `, event);
      if (event.key === "o") {
        increment();
        console.log("Keyboard shortcut detected: Ctrl+O");
      }
    };
    window.addEventListener("keyup", keyupListener);

    // if window looses focus log it
    const focusListener = () => {
      // after event loop, log visibilityState again
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          console.log("Window focus lost detected");
        }
      }, 100);
    };
    window.addEventListener("blur", focusListener);

    // if window gets focus log it
    window.addEventListener("focus", () => {
      console.log("Window focus detected");
    });

    // clean up
    return () => {
      console.log("removing keyboard shortcut listener");
      browser.commands.onCommand.removeListener(commandListener);

      window.removeEventListener("keydown", keyboardListener);

      browser.runtime.onMessage.removeListener(messageListener);

      window.removeEventListener("keyup", keyupListener);

      window.removeEventListener("blur", focusListener);

      console.log("keyboard shortcut listener removed");
    };
  });
</script>

<button on:click={increment}>
  Number of activations is {count}
</button>
