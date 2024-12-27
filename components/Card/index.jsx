export default function Card({ className, title, subtitle, Icon, content }) {
  return (
    <div
      className={`${className} w-full bg-white  dark:bg-gray-900 shadow-md rounded-md p-4 flex flex-col text-center  dark:text-white text-gray-700 `}>
      <h2 className="text-sm font-medium uppercase">{title}</h2>
      <h3 className="text-sm ">{subtitle}</h3>

      <div className="flex justify-center  items-center gap-2 mt-3">
        {Icon && <Icon className="w-6 h-6 " />}
        <div className="flex justify-center">
          {content}
        </div>
      </div>
    </div>
  );
}
