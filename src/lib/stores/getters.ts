import type { Page, PageWithoutFavIconUrl } from "../types";
import { getData } from "./tabStoreCore";

function withFaviconUrl(item: PageWithoutFavIconUrl): Page {
  // TODO: use extension api to get favicon url
  const domain = new URL(item.url).hostname;
  return {
    ...item,
    favIconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=${"64"}`,
  };
}

export function getById(id: number): Page {
  return withFaviconUrl(getData().find((item) => item.id === id));
}

export function getChildren(parent: number): Page[] {
  return getData()
    .filter((item) => item.parent === parent)
    .map(withFaviconUrl);
}

export function getCols(parent: Page, maxLevel: number): Page[][] {
  const cols = [[parent]];
  let currentParents = [parent];
  for (let level = 1; level < maxLevel; level++) {
    const nextChildren = currentParents.flatMap((item) => getChildren(item.id));
    if (nextChildren.length === 0) {
      break;
    }
    cols.push(nextChildren);
    currentParents = nextChildren;
  }
  return cols;
}

export function getAllOpenTabs(): PageWithoutFavIconUrl[] {
  return getData().filter(
    (item) => item.status === "openFront" || item.status === "openBack"
  );
}
