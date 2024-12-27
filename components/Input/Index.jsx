export default function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  required,
  className,
  ref,
}) {
  return (
    <div className="flex flex-col w-full space-y-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        className={`${className} w-full px-4 py-3 text-sm rounded-md focus:outline-none border dark:bg-gray-700 mt-2`}
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
