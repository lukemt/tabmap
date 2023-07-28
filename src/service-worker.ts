import browser from "webextension-polyfill";

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
    });
  }
}

async function activateCommand() {
  const tab = await openApp();

  // send message to app
  browser.tabs.sendMessage(tab.id, { message: "activate" });
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
browser.runtime.onInstalled.addListener(() => {
  openApp();

  browser.tabs.create({
    url: "chrome://extensions/shortcuts",
    index: 1,
  });
});

// when a new tab is created send a message to the content script
browser.tabs.onCreated.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { message: "hello from background" });
});
