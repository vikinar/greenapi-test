import React from "react";
import {Message} from "../hooks/useChat.ts";
import MessageBubble from "./MessageBubble.tsx";

const MessageList: React.FC<{ messages: Message[]; theme: string }> = ({ messages, theme }) => (
    <div className={`border p-4 h-80 overflow-auto ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} rounded-lg flex flex-col space-y-2 shadow-inner`}>
        {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
    </div>
);

export default MessageList;