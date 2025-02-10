import React, {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg transition-all focus:outline-none ${
            disabled
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
        }`}
    >
        {children}
    </button>
);

export default Button;