import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadarApex = ({ series = [], labels = [], colors = [], type }) => {
  const typeRef = useRef(type); // Simpan 'type' di useRef
  const [dataRadar, setDataRadar] = useState({
    type: typeRef.current, // Ambil dari useRef
    series: [],
    options: {
      chart: {
        type: "radar",
        fontFamily: "Poppins",
        foreColor: "var(--warna-9)",
      },
      stroke: {
        width: 2,
      },
      title: {
        text: "Radar Chart",
        align: "center",
        style: {
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        },
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}`,
        },
      },
      responsive: [
        {
          breakpoint: 1599,
          options: {
            chart: {
              width: "500px",
              height: "500px",
            },
          },
        },
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "400px",
              height: "400px",
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "300px",
              height: "300px",
            },
          },
        },
      ],
      colors: [],
    },
  });

  useEffect(() => {
    if (series && labels && colors) {
      // typeRef.current digunakan di sini jika dibutuhkan
      setDataRadar((prevState) => ({
        ...prevState,
        series,
        options: {
          ...prevState.options,
          xaxis: {
            categories: labels,
          },
          colors,
        },
      }));
    }
  }, [series, labels, colors]);

  return (
    <Chart
      options={dataRadar.options}
      series={dataRadar.series}
      type={typeRef.current} // Gunakan typeRef untuk akses nilai
      width={500}
      height={400}
    />
  );
};

export default RadarApex;
