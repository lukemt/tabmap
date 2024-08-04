import type { MessageFromService } from "./content-message-handlers";
import { serviceWorkerMessageHandler, type ContentMessage } from "./service-worker-message-handlers";

// Store all active connections
const connections: { [tabId: number]: chrome.runtime.Port } = {};

export function listenForContentScriptMessages() {
  chrome.runtime.onConnect.addListener((port) => {
    let tabId: number | undefined;

    console.log('Connected to content script:', port.name, port);

    if (port.name !== "tabmapConnection") return console.error("Invalid connection name");

    // Listen for messages from content scripts
    port.onMessage.addListener((message: ContentMessage) => {
      if (message.action === 'init') {
        // Store the connection with its tab ID
        tabId = message.tabId;
        connections[tabId] = port;
        console.log('Tab connected:', tabId);
      }
      // Handle other message types here
      serviceWorkerMessageHandler(message);
    });

    // Listen for disconnection
    port.onDisconnect.addListener(() => {
      if (tabId) {
        delete connections[tabId];
        console.log('Tab disconnected:', tabId);
      }
    });
  });

}

// Function to send a message to all connected content scripts
export function broadcastMessage(message: MessageFromService) {
  Object.values(connections).forEach((port) => {
    port.postMessage(message);
  });
}

// Example: Send a message to a specific tab
function sendMessageToTab(tabId: number, message: MessageFromService) {
  const port = connections[tabId];
  if (port) {
    port.postMessage(message);
  } else {
    console.log('Tab not connected:', tabId);
  }
}