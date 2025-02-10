import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface Message {
    sender: "me" | "them";
    text: string;
}

export const useChat = () => {
    const [idInstance, setIdInstance] = useState<string>("");
    const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const savedIdInstance = localStorage.getItem("idInstance");
        const savedApiTokenInstance = localStorage.getItem("apiTokenInstance");
        const savedPhoneNumber = localStorage.getItem("phoneNumber");

        if (savedIdInstance && savedApiTokenInstance && savedPhoneNumber) {
            setIdInstance(savedIdInstance);
            setApiTokenInstance(savedApiTokenInstance);
            setPhoneNumber(savedPhoneNumber);
        }
    }, []);

    const fetchMessages = useCallback(async () => {
        if (!idInstance || !apiTokenInstance) return;

        const url = `/api/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });

            if (response.data?.length > 0) {
                response.data.forEach((item: any) => {
                    const textMessage = item?.body?.messageData?.textMessageData?.textMessage;
                    if (textMessage) {
                        const newMessage: Message = {
                            sender: "them",
                            text: textMessage,
                        };
                        setMessages((prev) => [...prev, newMessage]);
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [idInstance, apiTokenInstance]);

    useEffect(() => {
        const intervalId = setInterval(fetchMessages, 5000);
        return () => clearInterval(intervalId);
    }, [fetchMessages]);

    const sendMessage = async () => {
        if (!idInstance || !apiTokenInstance || !phoneNumber || !message) return;
        const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
        try {
            const newMessage: Message = { sender: "me", text: message };
            await axios.post(url, {
                chatId: `${phoneNumber}@c.us`,
                message,
            });
            setMessages((prev) => [...prev, newMessage]);
            setMessage("");
        } catch (error) {
            console.error("Error sending:", error);
        }
    };

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        },
        [message, idInstance, apiTokenInstance, phoneNumber]
    );

    const isButtonDisabled = !idInstance || !apiTokenInstance || !phoneNumber || !message;

    return {
        idInstance,
        setIdInstance,
        apiTokenInstance,
        setApiTokenInstance,
        phoneNumber,
        setPhoneNumber,
        message,
        setMessage,
        messages,
        handleKeyDown,
        isButtonDisabled,
        sendMessage,
    };
};