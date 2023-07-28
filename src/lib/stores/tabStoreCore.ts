import type { TabInfo, TabInfoWithoutFavIconUrl } from "../types";
import { mockData } from "./mockData";

let data: TabInfoWithoutFavIconUrl[] = mockData;

export const getData = () => data;
export const setData = (newData: TabInfoWithoutFavIconUrl[]) => {
  data = newData;
};
