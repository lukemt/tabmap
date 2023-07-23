let appTab = null;

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.update(appTab.id, { active: true });
    await chrome.windows.update(appTab.windowId, { focused: true });
  } catch (e) {
    appTab = await chrome.tabs.create({
      url: chrome.runtime.getURL("appDist/index.html"),
    });
  }
});
