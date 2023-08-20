import browser from "webextension-polyfill";
import { getAllOpenTabs } from "./lib/stores/getters";
import type { PageWithoutFavIconUrl } from "./lib/types";

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

async function onStartup() {
  console.log("onStartup");
  // const tabMapData: TabInfoWithoutFavIconUrl[] =
  //   (await browser.storage.local.get("tabMapData")) || [];
  // setData(tabMapData);

  const openTabs = getAllOpenTabs();

  for (const tabInfo of openTabs) {
    if (tabInfo.status === "openFront") {
      await openTab(tabInfo);
    } else if (tabInfo.status === "openBack") {
      const tab = await openTab(tabInfo);
      // move tab to group
      moveToGroup(tab);
    }
  }
}

async function openTab(tabInfo: PageWithoutFavIconUrl) {
  console.log("openTab", { tabInfo });
  const existingTabs = await browser.tabs.query({ url: tabInfo.url });
  if (existingTabs.length > 0) {
    return existingTabs[0];
  }
  return await browser.tabs.create({
    url: tabInfo.url,
    active: false,
  });
}

async function moveToGroup(tab) {
  console.log("moveToGroup", { tab });
  // get group id
  const groupId = await getTabGroup();
  if (groupId !== null) {
    // move tab to group
    await chrome.tabs.group({
      tabIds: [tab.id],
      groupId,
    });
  } else {
    // create group
    console.log("create group");
    const groupId = await chrome.tabs.group({
      tabIds: [tab.id],
    });
    // move group to index 1
    console.log("move group to index 1");
    await chrome.tabGroups.move(groupId, { index: 1 });
    // collapse group
    console.log("collapse group");
    await chrome.tabGroups.update(groupId, {
      collapsed: true,
    });
  }
}

async function getTabGroup() {
  console.log("getTabGroup");
  const groups = await chrome.tabGroups.query({});
  if (groups.length > 0) {
    return groups[0].id;
  } else {
    console.log("no group found");
    return null;
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
