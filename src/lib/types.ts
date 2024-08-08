export interface Page {
  id: number;
  tabId: number;
  windowId: number;
  title?: string;
  url?: string;
  favIconUrl?: string;
  childrenIds: number[];
  navigatedToIds: number[];
  status: "open" | "navigatedAway" | "closed" | "archived" | "deleted";
  groupId?: number;
  incognito: boolean;
  pinned: boolean;
  createdAt: number;
  lastAccessedAt: number;
}

