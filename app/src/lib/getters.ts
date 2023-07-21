import { data } from "./data";
import type { TabInfo, TabInfoWithoutFavIconUrl } from "./types";

function withFaviconUrl(item: TabInfoWithoutFavIconUrl): TabInfo {
  // TODO: use extension api to get favicon url
  const domain = new URL(item.url).hostname;
  return {
    ...item,
    favIconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=${"64"}`,
  };
}

export function getById(id: number): TabInfo {
  return withFaviconUrl(data.find((item) => item.id === id));
}

export function getChildren(parent: number): TabInfo[] {
  return data.filter((item) => item.parent === parent).map(withFaviconUrl);
}

export function getCols(parent: TabInfo, maxLevel: number): TabInfo[][] {
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
