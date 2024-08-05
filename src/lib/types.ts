export interface Page {
  id: number;
  tabId: number;
  windowId: number;
  title: string;
  url: string;
  favIconUrl: string;
  childrenIds: number[];
  status: "openFront" | "openBack" | "closed" | "archived" | "deleted";
}

export type PageTree = (Page & { children: PageTree[], parent: number });

