import { openTab } from "../../service-worker";
import { broadcastMessage } from "./service-worker-message-broker";

export type ContentMessage =
  {
    action: "init",
    tabId: number,
  } |
  {
    action: "openTab",
    url: string
  }

export function serviceWorkerMessageHandler(message: ContentMessage) {
  switch (message.action) {
    case 'init': {
      console.log('Tab connected:', message.tabId);
      broadcastMessage({ action: "log", data: "Tab connected" })
      break;
    }
    case 'openTab': {
      console.log('Opening tab:', message.url);
      openTab(message.url);
      break;
    }
    default: {
      console.log('Unknown action:', message);
    }
  }
}