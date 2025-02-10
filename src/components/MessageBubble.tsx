import React from "react";

interface MessageBubbleProps {
    sender: "me" | "them";
    text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text }) => (
    <div className={`flex ${sender === "me" ? "justify-end" : "justify-start"}`}>
        <span className={`px-3 py-2 rounded-lg max-w-xs break-words ${sender === "me" ? "bg-green-500 text-white" : "bg-gray-600 text-white"}`}>
            {text}
        </span>
    </div>
);

export default MessageBubble;