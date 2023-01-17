/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";

export default function Input({
  title, name, placeholder, type, defaultValue= ""
}) {
  const [inputValue, setInputValue] = useState(defaultValue)
  return (
    <label className="block">
      <span className="text-gray-700 font-bold">{title}</span>
      <input
        type={type}
        className="mt-0 block w-full px-0.5 rounded-md border-gray-300 focus:ring-0 focus:outline-none focus:border-purple-500"
        placeholder={placeholder}
        name={name}
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
      />
    </label>
  );
}
