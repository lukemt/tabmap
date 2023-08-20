import type { Page, PageWithoutFavIconUrl } from "../types";
import { mockData } from "./mockData";

let data: PageWithoutFavIconUrl[] = mockData;

export const getData = () => data;
export const setData = (newData: PageWithoutFavIconUrl[]) => {
  data = newData;
};
