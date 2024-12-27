export default function Modal({
  content,
  show,
  onClose,
  title,
  button,
  onClick,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="dark:bg-gray-700 bg-white p-6 rounded-lg sm:w-1/4 md:w-1/3 lg:w-1/3 relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="flex absolute items-center top-2 right-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Title */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg uppercase font-medium">{title}</h2>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 p-1">{content}</div>

        {/* Buttons at the bottom */}
        <div className="mt-6 border-t border-gray-300 pt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 text-sm py-1.5 font-medium bg-red-500 text-white uppercase  rounded-lg hover:bg-red-600">
            cancel
          </button>
          <button
            onClick={onClick}
            className="px-4 py-1.5 text-sm font-medium uppercase bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
