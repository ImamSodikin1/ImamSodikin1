import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { debounce } from 'lodash';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CardChart = ({
  icon,
  title,
  data,
  percentage,
  isIncreasing,
  series = [],
  labels = [],
  colors = [],
  type,
  titleChart
}) => {
  const [dataChart, setData] = useState({
    type: type,
    series: [],
    options: {
      chart: {
        fontFamily: "Poppins",
        foreColor: "var(--warna-9)",
        toolbar: {
          show: false,
        }
      },
      stroke: {
        width: 2,
      },
      title: {
        text: titleChart,
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
      legend: {
          show: true,
          position: "bottom",
          horizontalAlign: "center",
          floating: false,
          fontSize: "15px",
        markers: {
          width: 12,
          height: 12,
          radius: 12,
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
      colors: colors,
    },
  });


  useEffect(() => {
    // Membandingkan hanya jika ada perubahan yang relevan
    setData((prevState) => {
      // Membandingkan referensi objek dan array secara langsung
      const isSeriesChanged = prevState.series !== series;
      const isCategoriesChanged = prevState.options.xaxis.categories !== labels;
      const isColorsChanged = prevState.options.colors !== colors;
  
      if (isSeriesChanged || isCategoriesChanged || isColorsChanged) {
        return {
          ...prevState,
          series: series,
          options: {
            ...prevState.options,
            xaxis: {
              categories: labels,
            },
            colors: colors,
          },
        };
      }
  
      // Tidak ada perubahan signifikan
      return prevState;
    });
  }, [series, labels, colors]);
  

  return (
    <div className="flex flex-col dark:bg-gray-900 bg-white justify-between rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className=" p-2 rounded-full">{icon}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{data}</p>
          <p
            className={`text-sm ${
              isIncreasing ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentage} {isIncreasing ? <FaArrowUp /> : <FaArrowDown />}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Chart
          options={dataChart.options}
          series={dataChart.series}
          type={type}
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};

export default CardChart;
