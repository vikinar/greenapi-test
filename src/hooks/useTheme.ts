import { useState, useEffect } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState<string>("");

    // Инициализация темы из localStorage или системных настроек
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            setTheme(systemTheme);
        }
    }, []);

    // Применение темы к документу и сохранение в localStorage
    useEffect(() => {
        if (theme) {
            localStorage.setItem("theme", theme);
            document.documentElement.classList.toggle("dark", theme === "dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    return { theme, toggleTheme };
};