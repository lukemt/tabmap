import { contentMessageHandler, type MessageFromService } from "./content-message-handlers";
import type { ContentMessage } from "./service-worker-message-handlers";

// Establish a connection with the background script
const port = chrome.runtime.connect({ name: 'tabmapConnection' });

// Send an initialization message with the tab ID
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0] && tabs[0].id) {
    port.postMessage({ action: 'init', tabId: tabs[0].id });
  }
});

// Listen for messages from the background script
port.onMessage.addListener((message: MessageFromService) => {
  console.log('Received message:', message);
  // Handle other message types here
  contentMessageHandler(message);
});

// Function to send a message to the background script
export function sendMessageToBackground(message: ContentMessage) {
  console.log('Sending message:', message);
  port.postMessage(message);
}

export function initContentMessageBroker() {
  // do nothing
  // just to make sure the file is imported and the code gets executed
  // only neceessary if sendMessageToBackground is not called from another file
}