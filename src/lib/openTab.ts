import * as browser from "webextension-polyfill";
import type { Page } from "./types";

export async function openTab(page: Page) {
  console.log("openTab", { page });

  switch (page.status) {
    case "open":
      await activateTab(page);
      break;
    case "closed":
    case "archived":
    case "deleted":
      await openNewTab(page);
      break;
    case "navigatedAway":
      await navigateToUrl(page);
      break;
  }
}

async function activateTab(page: Page) {
  try {
    await browser.tabs.update(page.tabId, { active: true });
    const updatedTab = await browser.tabs.get(page.tabId);
    if (updatedTab.url !== page.url) {
      alert(`Error: The URL has changed. Expected ${page.url}, but found ${updatedTab.url}`);
    }
  } catch (error) {
    console.error("Error activating tab:", error);
    alert("Error activating tab. The tab may have been closed.");
  }
}

async function openNewTab(page: Page) {
  const newTab = await browser.tabs.create({ url: page.url, active: true });
  updatePageWithNewTab(page, newTab);
}

async function navigateToUrl(page: Page) {
  try {
    await browser.tabs.update(page.tabId, { active: true });
    const history = await browser.history.search({ text: page.url, maxResults: 1 });
    if (history.length > 0) {
      await browser.tabs.update(page.tabId, { url: page.url });
    } else {
      alert(`Error: The URL ${page.url} is not present in the history.`);
      await browser.tabs.update(page.tabId, { url: page.url });
    }
  } catch (error) {
    console.error("Error navigating to URL:", error);
    alert("Error navigating to the URL. The tab may have been closed.");
  }
}

function updatePageWithNewTab(page: Page, newTab: browser.Tabs.Tab) {
  if (newTab.id) {
    const updatedPage = { ...page, tabId: newTab.id, status: "open" as const };
    pagesStore.set(page.id, updatedPage);
  }
}