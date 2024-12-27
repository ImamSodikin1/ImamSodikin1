export default function CardChart({
  children,
  className,
  title,
  classNameChildren,
}) {
  return (
    <div
      className={`${className} flex flex-col justify-center items-center bg-white dark:bg-gray-700 shadow-md rounded-md p-4 `}>
      {title && <h2 className="font-semibold text-center">{title}</h2>}
      <div className={`w-full p-2`}>{children}</div>
    </div>
  );
}
