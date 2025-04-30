import React from "react";
import Message from "./MessageChat";

const ChatArea = () => {
  return (
    <div className="chat-area">
      <div className="chat-header"></div>
      <duv className="messages">
        <Message text="Hey, how's it going" sent />
        <Message text="I am goood" received/>
      </duv>
    </div>
  );
};

export default ChatArea
