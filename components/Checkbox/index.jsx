import React from "react";

const CheckboxWithLabel = ({ id, label, checked, onChange, value }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4 text-blue-600 border rounded "
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={id}
        className="text-md font-medium dark:text-white text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckboxWithLabel;
