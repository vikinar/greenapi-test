import React from "react";

const ThemeToggle: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
    <div className="flex items-center">
        <span className="mr-2 text-gray-600 dark:text-gray-200">Тема</span>
        <button
            onClick={toggleTheme}
            className="relative w-12 h-6 bg-gray-300 rounded-full transition-all ease-in-out dark:bg-gray-600"
        >
            <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all ease-in-out ${theme === "dark" ? "translate-x-6" : ""}`}
            />
        </button>
    </div>
);

export default ThemeToggle;