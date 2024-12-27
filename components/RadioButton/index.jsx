import { useState, useEffect } from "react";

export default function RadioButton({ options, name, onChange, value }) {
  const [selected, setSelected] = useState(value || null);

  // Jika value berubah dari parent, sinkronkan state lokal
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (value) => {
    setSelected(value);
    if (onChange) onChange(value); // Callback untuk mengirim data ke parent component
  };

  return (
    <div className="w-full flex space-x-4">
      {options.map((option) => (
        <div
          key={option.value}
          className={`w-full flex items-center p-4 rounded-md cursor-pointer transition-colors border-2 ${
            selected === option.value
              ? "bg-red-500 border-red-500 text-white"
              : ""
          }`}
          onClick={() => handleSelect(option.value)}>
          {/* Lingkaran Radio */}
          <div
            className={`w-5 h-5 mr-4 flex items-center justify-center rounded-full border-2 transition-colors ${
              selected === option.value
                ? "bg-white text-red-500 border-white"
                : ""
            }`}>
            {selected === option.value && (
              <span className="text-red-500 font-bold">&#10003;</span>
            )}
          </div>

          {/* Label */}
          <label
            htmlFor={option.value}
            className="cursor-pointer w-full text-left">
            {option.label}
          </label>

          {/* Hidden Radio Input */}
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelect(option.value)}
            className="hidden"
          />
        </div>
      ))}
    </div>
  );
}
