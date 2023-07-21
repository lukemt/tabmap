import { data } from "./data";
import type { TabInfo } from "./types";

export function getById(id: number) {
  return data.find((item) => item.id === id);
}

export function getChildren(parent: number) {
  return data.filter((item) => item.parent === parent);
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
