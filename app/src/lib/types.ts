export interface TabInfo {
  id: number;
  title: string;
  url: string;
  favIconUrl: string;
  parent: number;
}

export type TabInfoWithoutFavIconUrl = Omit<TabInfo, "favIconUrl">;
