import browser from "webextension-polyfill";
import { pagesStore, TOP_LEVEL_PAGE_ID } from "./pagesStore";

const logEvent = (eventName: string) =>
  (...args: any) =>
    console.log(`tabs.${eventName}`, { args });

export async function attachObservers() {
  // observe creation of new tabs
  browser.tabs.onCreated.addListener((tab) => {
    console.log("tabs.onCreated", { tab });
    if (!tab.id || !tab.windowId) {
      console.error("tab.id or tab.windowId is undefined", { tab });
      return;
    }

    // add tab to store
    const pageId = pagesStore.incrementPageId()
    pagesStore.set(pageId, {
      id: pageId,
      tabId: tab.id,
      windowId: tab.windowId,
      url: tab.url,
      title: tab.title,
      favIconUrl: tab.favIconUrl,
      childrenIds: [],
      navigatedToIds: [],
      status: "open",
      groupId: (tab as any)?.groupId,
      incognito: tab.incognito,
      pinned: tab.pinned,
      createdAt: Date.now(),
      lastAccessedAt: Date.now(),
    })

    if (tab.openerTabId) {
      // tab was opened by another tab
      console.log("tab was opened by another tab", { tab });
      const parentPage = pagesStore.getByTabId(tab.openerTabId);
      // add childId
      if (parentPage) {
        parentPage.childrenIds.push(pageId);
        pagesStore.set(parentPage.id, parentPage);
      } else {
        console.error("parentPage not found", { tab });
      }
    } else {
      const topPage = pagesStore.get(TOP_LEVEL_PAGE_ID);
      if (topPage) {
        topPage.childrenIds.push(pageId);
        pagesStore.set(topPage.id, topPage);
      }
    }
  });

  // observe removal of tabs
  browser.tabs.onRemoved.addListener(logEvent("onRemoved"));

  // observe tab updates
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("tabs.onUpdated", { tabId, changeInfo, tab });
    if (!tab.id || !tab.windowId) {
      console.error("tab.id or tab.windowId is undefined", { tab });
      return;
    }
    // update tab in store
    const page = pagesStore.getByTabId(tabId);

    if (!page) {
      console.error("page not found", { tab });
      return;
    }
    if (page.tabId !== tab.id) {
      console.error("tabId mismatch", { page, tab });
    }
    // if navigated away..
    if (page.url !== tab.url) {
      console.log("navigated away, creating new page...", { fromUrl: page.url, toUrl: tab.url })

      // add page to store
      const newPageId = pagesStore.incrementPageId()
      pagesStore.set(newPageId, {
        id: newPageId,
        tabId: tab.id,
        windowId: tab.windowId,
        url: tab.url,
        title: tab.title,
        favIconUrl: tab.favIconUrl,
        childrenIds: [],
        navigatedToIds: [],
        status: "open",
        groupId: (tab as any)?.groupId,
        incognito: tab.incognito,
        pinned: tab.pinned,
        createdAt: Date.now(),
        lastAccessedAt: Date.now(),
      })

      page.navigatedToIds.push(newPageId);
      page.status = "navigatedAway"
      pagesStore.set(page.id, page);
    } else {

      pagesStore.set(page.id, {
        ...page,
        tabId: tab.id,
        windowId: tab.windowId,
        url: tab.url,
        title: tab.title,
        favIconUrl: tab.favIconUrl,
        groupId: (tab as any)?.groupId,
        incognito: tab.incognito,
        pinned: tab.pinned,
      });
    }


  });
  // observe tab moves
  browser.tabs.onMoved.addListener(logEvent("onMoved"));
  // observe tab activated
  browser.tabs.onActivated.addListener(logEvent("onActivated"));
  // observe tab attached
  browser.tabs.onAttached.addListener(logEvent("onAttached"));
  // observe tab detached
  browser.tabs.onDetached.addListener(logEvent("onDetached"));
  // observe tab replaced
  browser.tabs.onReplaced.addListener(logEvent("onReplaced"));
  // observe tab zoom changes
  browser.tabs.onZoomChange.addListener(logEvent("onZoomChange"));


  const existingTabs = await browser.tabs.query({});
  console.log("existingTabs", existingTabs);
  // add existing tabs to store
  existingTabs.forEach((tab) => {
    if (!tab.id || !tab.windowId) {
      console.error("tab.id or tab.windowId is undefined", { tab });
      return;
    }
    const pageId = pagesStore.incrementPageId()
    pagesStore.set(pageId, {
      id: pageId,
      tabId: tab.id,
      windowId: tab.windowId,
      url: tab.url,
      title: tab.title,
      favIconUrl: tab.favIconUrl,
      childrenIds: [],
      navigatedToIds: [],
      status: "open",
      groupId: (tab as any)?.groupId,
      incognito: tab.incognito,
      pinned: tab.pinned,
      createdAt: Date.now(),
      lastAccessedAt: Date.now(),
    })
    // add childId
    const topPage = pagesStore.get(TOP_LEVEL_PAGE_ID);
    if (topPage) {
      topPage.childrenIds.push(pageId);
      pagesStore.set(topPage.id, topPage);
    }
  })
}
