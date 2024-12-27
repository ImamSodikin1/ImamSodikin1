import React from "react";
import Select from "react-select";

export default function MultiSelectWithCheckbox({
  options,
  value,
  onChange,
  placeholder,
}) {
  // Custom rendering untuk opsi dengan checkbox
  const CustomOption = (props) => {
    const { data, innerRef, innerProps, isSelected } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`flex items-center p-2 cursor-pointer transition-colors ${
          isSelected
            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-600"
        }`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => null} // Hanya untuk tampilan visual
          className="mr-2"
        />
        <label className="cursor-pointer">{data.label}</label>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Select
        isMulti
        closeMenuOnSelect={false} // Tetap buka dropdown setelah memilih
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="react-select-container border rounded-md"
        classNamePrefix="react-select"
        components={{ Option: CustomOption }} // Custom opsi dengan checkbox
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
              ? "var(--tw-bg-opacity, 1) bg-gray-200"
              : "var(--tw-bg-opacity, 1) bg-gray-100",
            borderColor: state.isFocused ? "#60a5fa" : "#d1d5db",
            boxShadow: "none",
            // "&:hover": {
            //   borderColor: "#60a5fa",
            // },
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: '#374151'
                ? "var(--tw-bg-opacity, 1) bg-gray-800"
                : "var(--tw-bg-opacity, 1) bg-gray-700",
              borderColor: state.isFocused ? "#3b82f6" : "#374151",
            },
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "white",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: "var(--tw-bg-opacity, 1) bg-gray-800",
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "var(--tw-bg-opacity, 1) bg-gray-200"
              : "transparent",
            "&:hover": {
              backgroundColor: "var(--tw-bg-opacity, 1) bg-gray-100",
            },
            color: state.isSelected ? "#1f2937" : "#4b5563",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: state.isSelected
                ? "var(--tw-bg-opacity, 1) bg-gray-700"
                : "transparent",
              "&:hover": {
                backgroundColor: "var(--tw-bg-opacity, 1) bg-gray-600",
              },
              color: state.isSelected ? "white" : "#9ca3af",
            },
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#bfdbfe",
            color: "#1d4ed8",
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: "#1e40af",
              color: "white",
            },
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#1d4ed8",
            "@media (prefers-color-scheme: dark)": {
              color: "white",
            },
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "#1d4ed8",
            ":hover": {
              backgroundColor: "#e5e7eb",
              color: "white",
            },
            "@media (prefers-color-scheme: dark)": {
              color: "white",
              ":hover": {
                backgroundColor: "#374151",
                color: "white",
              },
            },
          }),
        }}
      />
    </div>
  );
}
