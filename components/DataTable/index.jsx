import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import Button from "../Button";

const DataTable = ({
  title,
  columns,
  data,
  pageSize = 10,
  onRowSelected,
  button,
  onClick,
}) => {
  const { theme } = useTheme();
  const [muiTheme, setMuiTheme] = useState(createTheme());

  useEffect(() => {
    // Update tema berdasarkan tema yang dipilih
    const selectedTheme =
      theme === "dark"
        ? createTheme({
            palette: {
              mode: "dark",
              primary: { main: "#4A5568" },
              background: { default: "#4A5568" },
            },
          })
        : createTheme({
            palette: {
              mode: "light",
              primary: { main: "#ffffff" },
              background: { default: "#ffffff" },
            },
          });

    setMuiTheme(selectedTheme);
  }, [theme]);

  const options = {
    filterType: "checkbox",
    responsive: "standard",
    selectableRows: "none", // multiple
    rowsPerPage: pageSize,
    rowsPerPageOptions: [5, 8],
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      const selectedRows = rowsSelected.map((index) => data[index]);
      if (onRowSelected) onRowSelected(selectedRows);
    },
    customToolbar: () => (
      <button
        className={` uppercase font-medium bg-green-500 text-white rounded-full ms-3 py-1.5 px-4  hover:bg-green-600`}
        onClick={onClick}>
        {button}
      </button>
    ),
  };

  const formattedColumns = columns.map((col) => ({
    name: col.name, // Gunakan `name` yang ada di definisi kolom
    label: col.label || col.name,
    options: col.options || {},
  }));

  const formattedData = data.map((row) =>
    formattedColumns.reduce((acc, col) => {
      acc[col.name] = row[col.name];
      return acc;
    }, {})
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <MUIDataTable
        title={title}
        data={formattedData}
        columns={formattedColumns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default DataTable;
