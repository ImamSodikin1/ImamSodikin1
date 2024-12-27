import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieApex = ({ series = [], labels = [], colors = [] }) => {
  const [dataPie, setDataPie] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
        fontFamily: "Poppins",
        foreColor: "var(--warna-9)",
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "right",
        horizontalAlign: "center",
        fontSize: "14px",
        markers: {
          width: 10,
          height: 10,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: "29px",
                fontFamily: "Poppins",
                offsetY: -10,
              },
              value: {
                fontSize: "26px",
                fontFamily: "Poppins",
                offsetY: 16,
              },
              total: {
                show: true,
                label: "Total",
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "Poppins",
                offsetY: -10,
              },
            },
          },
        },
      },
      stroke: {
        show: true,
        width: 10,
        colors: "var(--warna-3)",
      },
      responsive: [
        {
          breakpoint: 1599,
          options: {
            chart: {
              width: "450px",
              height: "450px",
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 1439,
          options: {
            chart: {
              width: "400px",
              height: "400px",
            },
            legend: {
              position: "right",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "65%",
                },
              },
            },
          },
        },
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "350px",
              height: "350px",
            },
            legend: {
              position: "bottom",
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
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      colors: [],
      noData: {
        text: "Loading...",
      },
      labels: [],
    },
  });

  useEffect(() => {
    setDataPie((prevState) => ({
      ...prevState,
      series,
      options: {
        ...prevState.options,
        labels,
        colors,
      },
    }));
  }, [series, labels, colors]);

  return (
    <>
      <Chart
        options={dataPie.options}
        series={dataPie.series}
        type="donut"
        width={500}
        height={400}
      />
    </>
  );
};

export default PieApex;
