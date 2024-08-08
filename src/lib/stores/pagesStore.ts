import type { Page } from "../types";
import { mockData } from "./mockData";
import { writable, type Writable } from "svelte/store";

export const TOP_LEVEL_PAGE_ID = 1;

const pagesMap = new Map<number, Page>()
const subscribedPages = new Map<number, Writable<Page>>()
const mutationListeners = new Set<(page: Page) => void>();
let pageIdIncrement = 100;

function faviconUrl(url: string): string {
  // TODO: use extension api to get favicon url
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${"64"}`
}
// Initialize the map with the mock data
[mockData[0]].forEach((page, index) => {
  pagesMap.set(page.id, {
    id: page.id,
    tabId: index,
    windowId: 0,
    title: page.title,
    url: page.url,
    childrenIds: [mockData[0]].filter(p => p.parent === page.id).map(p => p.id),
    navigatedToIds: [],
    status: index < 3 ? "open" : "closed",
    favIconUrl: faviconUrl(page.url),
    groupId: -1,
    incognito: false,
    pinned: false,
    createdAt: Date.now(),
    lastAccessedAt: Date.now(),
  })
})



function get(id: number) {
  const page = pagesMap.get(id)
  if (!page) console.error("pageStore.get(): Page not found", { id })
  return page
}

function getByTabId(tabId: number): Page | undefined {
  // sorted by status: open, closed, navigatedTo
  // TODO optimise perf
  return Array.from(pagesMap.values())
    .filter(page => page.tabId === tabId)
    .sort((a, b) => {
      // i hope this works (ai generated)
      if (a.status === "open" && b.status !== "open") return -1
      if (a.status !== "open" && b.status === "open") return 1
      if (a.status === "closed" && b.status !== "closed") return -1
      if (a.status !== "closed" && b.status === "closed") return 1
      return 0
    })[0]
}

function set(id: number, page: Page) {
  console.log("pagesStore.set()", { id, page })
  pagesMap.set(id, page)
  subscribedPages.get(id)?.set(page)
  mutationListeners.forEach(callback => callback(page));
}


function getSubscribablePage(id: number) {
  if (!pagesMap.has(id)) {
    console.error(`Page with id ${id} does not exist`)
    throw new Error("Panic")
  }
  const page = pagesMap.get(id) as Page
  const store = writable(page)
  subscribedPages.set(id, store)

  // return "readable" store
  return { subscribe: store.subscribe }
}

function addMutationListener(callback: (page: Page) => void) {
  mutationListeners.add(callback);
}

function removeMutationListener(callback: (page: Page) => void) {
  mutationListeners.delete(callback);
}



export const pagesStore = {
  set,
  get,
  getByTabId,
  getSubscribablePage,
  incrementPageId: (() => pageIdIncrement++),
  addMutationListener,
  removeMutationListener
}

