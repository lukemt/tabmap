import type { Page } from "../types";
import { mockData } from "./mockData";
import { writable, type Writable } from "svelte/store";



function faviconUrl(url: string): string {
  // TODO: use extension api to get favicon url
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${"64"}`
}

export const pages = new Map<number, Page>()
// Initialize the map with the mock data
mockData.forEach((page, index) => {
  pages.set(page.id, {
    id: page.id,
    tabId: 0,
    windowId: 0,
    title: page.title,
    url: page.url,
    childrenIds: mockData.filter(p => p.parent === page.id).map(p => p.id),
    status: index < 3 ? "openFront" : "openBack",
    favIconUrl: faviconUrl(page.url),
  })
})

const subs = new Map<number, Writable<Page>>()

export function subscribablePage(id: number) {
  const store = writable(pages.get(id))
  subs.set(id, store)
  // return "readable" store
  return { subscribe: store.subscribe }
}

export function setPage(id: number, page: Page) {
  pages.set(id, page)
  subs.get(id)?.set(page)
}

