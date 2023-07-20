import { data, type Link } from "./data";

export function getById(id: number) {
  return data.find((item) => item.id === id);
}

export function getChildren(parent: number) {
  return data.filter((item) => item.parent === parent);
}

export function getCols(parent): Link[][] {
  // all children in first array
  // all grand children in second array
  // all grand grand children in third array
  // and so on...
  const firstCol = [getById(parent)];
  const cols = [firstCol];
  let currentParents = firstCol;
  while (true) {
    const nextChildren = currentParents.flatMap((item) => getChildren(item.id));
    if (nextChildren.length === 0) {
      break;
    }
    cols.push(nextChildren);
    currentParents = nextChildren;
  }
  return cols;
}
