import browser from "webextension-polyfill";

export function attachObservers() {
  // observe creation of new tabs
  browser.tabs.onCreated.addListener((tab) => {
    console.log(`Tab created: ${tab.id}`);
  });

  // observe removal of tabs
  browser.tabs.onRemoved.addListener((tabId) => {
    console.log(`Tab removed: ${tabId}`);
  });
  // observe tab updates
  browser.tabs.onUpdated.addListener((tabId) => {
    console.log(`Tab updated: ${tabId}`);
  });

  // observe tab moves
  browser.tabs.onMoved.addListener((tabId) => {
    console.log(`Tab moved: ${tabId}`);
  });

  // observe tab activated
  browser.tabs.onActivated.addListener((activeInfo) => {
    console.log(`Tab activated: ${activeInfo.tabId}`);
  });
  // observe tab attached
  browser.tabs.onAttached.addListener((tabId) => {
    console.log(`Tab attached: ${tabId}`);
  });
  // observe tab detached
  browser.tabs.onDetached.addListener((tabId) => {
    console.log(`Tab detached: ${tabId}`);
  });
  // observe tab replaced
  browser.tabs.onReplaced.addListener((addedTabId) => {
    console.log(`Tab replaced: ${addedTabId}`);
  });
  // observe tab zoom changes
  browser.tabs.onZoomChange.addListener((zoomChangeInfo) => {
    console.log(`Tab zoom changed: ${zoomChangeInfo}`);
  });
}
