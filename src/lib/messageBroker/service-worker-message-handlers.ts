import { broadcastMessage } from "./service-worker-message-broker";

export type ContentMessage =
  {
    action: "init",
    tabId: number,
  }

export function serviceWorkerMessageHandler(message: ContentMessage) {
  switch (message.action) {
    case 'init': {
      console.log('Tab connected:', message.tabId);
      broadcastMessage({ action: "log", data: "Tab connected" })
      break;
    }
    default: {
      console.log('Unknown action:', message);
    }
  }
}