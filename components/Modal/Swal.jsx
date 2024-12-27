import Swal from "sweetalert2";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

const Swaler = ({
  title,
  text,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
}) => {
  const { theme } = useTheme(); // Memanggil hook di dalam function component

  // Tentukan latar belakang berdasarkan tema
  const swalBackground = theme === "dark" ? "bg-gray-800" : "bg-white";

  useEffect(() => {
    const showSwal = async () => {
      await Swal.fire({
        title,
        text,
        icon,
        showCancelButton,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        background: swalBackground,
      });
    };

    showSwal(); // Menampilkan Swal setelah komponen dipasang
  }, [
    swalBackground,
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  ]);

  return null; // Tidak perlu rendering UI
};

export default Swaler;
