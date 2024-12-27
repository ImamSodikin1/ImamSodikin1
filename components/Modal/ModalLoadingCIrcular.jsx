const ModalLoadingCircular = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ">
      <div className=" p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-blue-500 border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalLoadingCircular;
