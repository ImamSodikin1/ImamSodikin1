import React, { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Ambil file pertama yang dipilih
    setFile(selectedFile); // Menyimpan file ke state
    if (onUpload) {
      // Pastikan onUpload menerima file dalam bentuk array, meskipun hanya ada satu file
      onUpload([selectedFile]); // Kirim file sebagai array
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (onUpload) {
      onUpload([]); // Kirim array kosong jika file dihapus
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 border rounded-md bg-white dark:bg-gray-700">
      <label
        htmlFor="file-upload"
        className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
        {!file ? (
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Drag and drop a file here, or click to select a file
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              (Only .jpg, .png, .pdf, etc.)
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Selected file: <strong>{file.name}</strong>
            </p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="mt-2 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded">
              Remove File
            </button>
          </div>
        )}
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
