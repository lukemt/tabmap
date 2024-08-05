import type { Page, PageTree } from "../types";
import { pages } from "./pagesStore";

export function getChildren(parent: number): Page[] {
  const page = pages.get(parent)
  if (!page) return []
  return page.childrenIds.map(id => pages.get(id)!)
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

export function getPageTree(parentId: number): PageTree[] {
  return getChildren(parentId)
    .map((item) => ({
      ...item,
      parent: parentId,
      children: getPageTree(item.id),
    }));
}