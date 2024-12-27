export default function Select({
  id,
  label,
  value,
  onChange,
  name,
  required,
  options,
  className,
  plcaeholder,
}) {
  return (
    <div className="flex flex-col w-full space-y-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <select
        className={`${className} w-full px-4 py-3 text-sm rounded-md focus:outline-none border dark:bg-gray-700 mt-2`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        // aria-placeholder={plcaeholder}
        required={required}>
        <option value="" disabled>
          Pilih opsi
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
