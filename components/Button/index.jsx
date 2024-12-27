export default function Button({
  children,
  type,
  onClick,
  disabled,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 uppercase font-medium text-white rounded-md py-2 px-4 hover:bg-transparent hover:text-blue-500 border border-blue-500 mt-2 ${className}`}>
      {children}
    </button>
  );
}
