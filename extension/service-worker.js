let appTab = null;

const openApp = async (tab) => {
  const appUrl = chrome.runtime.getURL("appDist/index.html");
  // query for existing app tab
  const tabs = await chrome.tabs.query({ url: appUrl });
  if (tabs.length > 0) {
    // if app tab exists, focus it
    await chrome.tabs.update(tabs[0].id, { active: true });
    await chrome.windows.update(tabs[0].windowId, { focused: true });
  } else {
    // if app tab does not exist, create it, pin it, and focus it
    appTab = await chrome.tabs.create({
      url: appUrl,
      pinned: true,
      active: true,
    });
  }
};

// listen for click on extension icon
chrome.action.onClicked.addListener(openApp);

// listen for keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  if (command === "open-app") {
    openApp();
  }
});
