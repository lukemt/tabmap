export interface Page {
  id: number;
  tabId: number;
  windowId: number;
  title: string;
  url: string;
  favIconUrl: string;
  parent: number;
  status: "openFront" | "openBack" | "closed" | "archived" | "deleted";
}

export type PageWithoutFavIconUrl = Omit<Page, "favIconUrl">;


export type PageTree = (Page & { children: PageTree[] });