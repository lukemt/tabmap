export interface TabInfo {
  id: number;
  tabId: number;
  windowId: number;
  title: string;
  url: string;
  favIconUrl: string;
  parent: number;
  status: "openFront" | "openBack" | "closed" | "archived" | "deleted";
}

export type TabInfoWithoutFavIconUrl = Omit<TabInfo, "favIconUrl">;
