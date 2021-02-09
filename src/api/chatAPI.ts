let subscribers = {
  "message-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};
type EventsNamesTypes = "message-received" | "status-changed";
let ws: WebSocket | null = null;
const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((s) => s(status));
};

let closeHandler = () => {
  notifySubscribersAboutStatus("pending");
  console.log("CLOSE WS");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["message-received"].forEach((s) => s(newMessages));
};
const openHandler = () => {
  notifySubscribersAboutStatus("ready");
};
const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.log("REFRESH PAGE");
};
const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
};

function createChannel() {
  cleanUp();
  ws?.close();

  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  ws?.addEventListener("close", closeHandler);
  ws?.addEventListener("message", messageHandler);
  ws?.addEventListener("open", openHandler);
  ws?.addEventListener("error", errorHandler);
}

export const chatAPI = {
  subscribe(
    eventName: EventsNamesTypes,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers.push(callback);
    return () => {
      // @ts-ignore
      subscribers = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe(
    eventName: EventsNamesTypes,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      // @ts-ignore
      (s) => s !== callback
    );
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
  start() {
    createChannel();
  },
  stop() {
    subscribers["message-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    ws?.close();
  },
};
export type MessagesReceivedSubscriberType = (
  messages: ChatMessageType[]
) => void;
export type StatusChangedSubscriberType = (status: StatusType) => void;
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export type StatusType = "pending" | "ready" | "error";
