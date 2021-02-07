import React, { ChangeEvent, useEffect, useState } from "react";
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
  useEffect(() => {
    Dispatch(startMessagesListening());
    return () => {
      Dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppState) => state.chat.messages);

  return (
    <div style={{ height: "200px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message message={m} key={index} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} style={{ width: "30px" }} alt="" />{" "}
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );

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
        <button disabled={false} onClick={sendMessageHandler}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
