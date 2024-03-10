"use client";
import dynamic from "next/dynamic";
import React from "react";
import "./admin.css";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

const ChatMess = () => {
  return (
    <div className="nhantin">
      <ChatEngine
        // height="calc(100vh - 212px)"
        projectID="2f9518a5-9f13-4be0-9e34-2eda4e91c9ef"
        userName={"admin"}
        userSecret={"123456"}
        renderNewMessageForm={() => <MessageFormSocial />}
      />
    </div>
  );
};
export default ChatMess;
