import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chatReducer";
import { AppState, StateType } from "../../redux/reduxStore";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const Dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.chat.status);

  useEffect(() => {
    Dispatch(startMessagesListening());
    return () => {
      Dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && (
        <div>Some error occured. Please refresh the page</div>
      )}
      <Messages />
      <AddMessageForm />
    </div>
  );
};

// @ts-ignore
window.gMessages = [];

const Messages: React.FC = ({}) => {
  const messages = useSelector((state: AppState) => state.chat.messages);
  const messagesAncorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    var element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };
  useEffect(() => {
    if (isAutoScroll) {
      messagesAncorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //@ts-ignore
  gMessages.push(messages);
  return (
    <div
      style={{ height: "200px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messages.map((m, index) => (
        <Message message={m} key={m.id} />
      ))}
      <div ref={messagesAncorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    console.log(">>>>> MESSAGE");

    return (
      <div>
        <img src={message.photo} style={{ width: "30px" }} alt="" />{" "}
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
      </div>
    );
  }
);

const AddMessageForm: React.FC = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );

  const status = useSelector((state: AppState) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }

    dispatch(sendMessage(message));
    setMessage("");
  };
  debugger;
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        />
      </div>
      <div>
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
