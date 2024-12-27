import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="borderpx-4 py-2 text-left text-gray-700 font-semibold"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="border px-4 py-2 text-gray-600"
                >
                  {column.render ? column.render(row[column.field], row) : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table