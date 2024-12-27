export default function KeluhanForm({
  id,
  label,
  placeholder,
  value,
  onChange,
  name,
  required,
  className,
  ref,
  rows,
}) {
  return (
    <div className="flex flex-col w-full space-y-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <textarea
        className={`${className} w-full px-4 py-3 text-sm rounded-md focus:outline-none border dark:bg-gray-700 mt-2`}
        ref={ref}
        ipconfig
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows} // Atur tinggi textarea dengan jumlah baris
      />
    </div>
  );
}
