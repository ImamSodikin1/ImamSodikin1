import { useState } from "react";
import Spacer from "../Spacer";

const Table = ({ columns, data, title }) => {
  const itemsPerPage = 10; // Jumlah data per halaman
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = data?.slice(startIndex, startIndex + itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto w-full bg-[var(--warna-3)] py-10 px-12 rounded-md">
      <div className="flex justify-center uppercase font-medium bg-gray-500 shadow rounded py-2 sm:py-2 md:py-2 lg:py-3">
        <h1 className="text-xl font-semibold uppercase text-white">{title}</h1>
      </div>
      <Spacer size={0.5} axis="vertical" />
      <table className="min-w-full bg-[var(--warna-3)] rounded">
        <thead className="bg-[var(--warna-3)]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Tampilkan pesan No Data jika displayedData kosong */}
          {displayedData?.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500 font-semibold"
              >
                No data available
              </td>
            </tr>
          ) : (
            displayedData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 text-left py-4 whitespace-nowrap text-sm"
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Spacer size={0.5} axis="vertical" />

      {/* Pagination */}
      {data?.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          {/* Tombol Previous */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-xl font-medium rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            &lt; {/* Simbol untuk Previous */}
          </button>

          {/* Informasi Halaman */}
          <span className="text-gray-500 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          {/* Tombol Next */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-xl font-medium rounded ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            &gt; {/* Simbol untuk Next */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
