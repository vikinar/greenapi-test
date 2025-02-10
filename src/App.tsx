import React from "react";
import InputField from "./components/InputField";
import Button from "./components/Button";
import { useChat } from "./hooks/useChat";
import { useTheme } from "./hooks/useTheme";
import MessageList from "./components/MessageList.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";

const App: React.FC = () => {
    const {
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
    } = useChat();

    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`flex items-center justify-center min-h-screen p-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <div className={`p-6 w-full max-w-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} shadow-xl rounded-xl flex flex-col space-y-4`}>
                {/* Заголовок и переключатель темы */}
                <div className="flex justify-between items-center">
                    <h1 className={`text-2xl font-bold text-center ${theme === "dark" ? "text-gray-100" : "text-gray-700"}`}>
                        WhatsApp Chat
                    </h1>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>

                {/* Поля ввода */}
                <div className="space-y-2">
                    <InputField placeholder="idInstance" value={idInstance} onChange={(e) => setIdInstance(e.target.value)} />
                    <InputField placeholder="apiTokenInstance" value={apiTokenInstance} onChange={(e) => setApiTokenInstance(e.target.value)} />
                    <InputField placeholder="Номер телефона" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

                {/* История сообщений */}
                <MessageList messages={messages} theme={theme} />

                {/* Поле ввода сообщения */}
                <div className="flex space-x-2">
                    <InputField
                        placeholder="Введите сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button onClick={sendMessage} disabled={isButtonDisabled}>
                        Отправить
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default App;