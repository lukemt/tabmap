export type MessageFromService =
  {
    action: "update",
    data: string,
  } |
  {
    action: "log",
    data: any
  }

export function contentMessageHandler(message: MessageFromService) {
  switch (message.action) {
    case "update": {
      console.log('Received update:', message.data);
      break;
    }
    case "log": {
      console.log('Received log:', message.data);
      break;
    }
    default: {
      console.error('Unknown action:', message);
    }
  }
}