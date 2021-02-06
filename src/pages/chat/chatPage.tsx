import React from "react";

const ws = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = [1, 2, 3, 4];

  return (
    <div style={{ height: "200px", overflowY: "auto" }}>
      {messages.map((m: any) => (
        <Message />
      ))}
      {messages.map((m: any) => (
        <Message />
      ))}
      {messages.map((m: any) => (
        <Message />
      ))}
      {messages.map((m: any) => (
        <Message />
      ))}
    </div>
  );
};

const Message: React.FC = () => {
  const message = {
    url: "https://via.placeholder.com/50/0000FF/808080/?Text=Digital.com",
    author: "Sergey",
    text: "Hello Friends",
  };
  return (
    <div>
      <img src={message.url} alt="" /> <b>{message.author}</b>
      <br />
      {message.text}
      <hr />
    </div>
  );
};

const AddMessageForm = () => {
  return (
    <div>
      <div>
        <textarea></textarea>
      </div>
      <div>
        <button>send</button>
      </div>
    </div>
  );
};

export default ChatPage;
