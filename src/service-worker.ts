import browser from "webextension-polyfill";

const openApp = async () => {
  const appUrl = browser.runtime.getURL("src/index.html");
  // query for existing app tab
  const tabs = await browser.tabs.query({ url: appUrl });
  if (tabs.length > 0) {
    // if app tab exists, focus it
    await browser.tabs.update(tabs[0].id, { active: true });
    await browser.windows.update(tabs[0].windowId, { focused: true });
  } else {
    // if app tab does not exist, create it, pin it, and focus it
    await browser.tabs.create({
      url: appUrl,
      pinned: true,
      active: true,
    });
  }
};

// listen for click on extension icon
browser.action.onClicked.addListener(openApp);

// listen for keyboard shortcut
browser.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  if (command === "open-app") {
    openApp();
  }
});

// welcome message
browser.runtime.onInstalled.addListener(() => {
  console.log("Installed!");
});

// when a new tab is created send a message to the content script
browser.tabs.onCreated.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { message: "hello from background" });
});
