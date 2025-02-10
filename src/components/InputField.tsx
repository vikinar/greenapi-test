import React, {InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({ placeholder, value, onChange }) => (
    <input
        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white placeholder-gray-400 dark:bg-gray-200 dark:text-black dark:placeholder-gray-600"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

export default InputField;