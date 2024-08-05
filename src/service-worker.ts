import * as browser from "webextension-polyfill";
import { attachObservers } from "./lib/stores/browserObservers";
import { listenForContentScriptMessages } from "./lib/messageBroker/service-worker-message-broker";

/**
 * Opens or focuses the TabMap overview tab.
 */
async function openApp() {
  console.log("openApp");
  const appUrl = browser.runtime.getURL("src/index.html");
  // query for existing app tab
  const tabs = await browser.tabs.query({
    url: appUrl,
    lastFocusedWindow: true,
  });
  if (tabs.length > 0) {
    // if app tab exists, focus it
    browser.tabs.update(tabs[0].id, { active: true });
    return tabs[0];
  } else {
    // if app tab does not exist, create it, and focus it, position it to the very left
    return await browser.tabs.create({
      url: appUrl,
      active: true,
      index: 0,
      pinned: true,
    });
  }
}

async function onStartup() {
  console.log("onStartup");
  // nothing to do i guess
  // maybe openApp()?
}

async function activateCommand() {
  const tab = await openApp();

  // send message to app
  browser.tabs.sendMessage(tab.id!, { message: "activate" });
}

// listen for click on extension icon
browser.action.onClicked.addListener(activateCommand);

// listen for keyboard shortcut
browser.commands.onCommand.addListener(async (command) => {
  console.log(`Command: ${command}`);
  if (command === "open-app") {
    await activateCommand();
  }
});

// welcome message
browser.runtime.onInstalled.addListener(({ reason }) => {
  console.log("onInstalled");
  if (reason === "install") {
    openApp();

    browser.tabs.create({
      url: "chrome://extensions/shortcuts",
      index: 1,
    });

    onStartup();
  } else if (reason === "update") {
    onStartup();
  } else {
    console.log(`onInstalled reason: ${reason}`);
  }
});

browser.runtime.onStartup.addListener(onStartup);

attachObservers();
listenForContentScriptMessages();
