import Card from "@/components/Card";
import CardChart from "@/components/Card/ChartCard";
import Spacer from "@/components/Spacer";
import dynamic from "next/dynamic";
import Table from "@/components/DataTable/Table";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Dashboard() {
  const chartOptions = {
    chart: { id: "basic-line" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
  };
  const chartSeries = [{ name: "Series 1", data: [30, 40, 35, 50] }];

  const seriesData = [
    {
      name: "User 1",
      data: [80, 90, 70, 60, 80], // Data untuk 'Offline', 'Online', 'Exception'
    },
    {
      name: "User 2",
      data: [60, 50, 90],
    },
    {
      name: "User 3",
      data: [60, 50, 90],
    },
    {
      name: "User 4",
      data: [60, 50, 90],
    },
  ];

  const columns = [
    { header: "Nama", field: "name" },
    { header: "Email", field: "email" },
    { header: "Status", field: "status", render: (value) => (value ? "Aktif" : "Nonaktif") },
  ];

  const data = [
    { name: "John Doe", email: "john@example.com", status: true },
    { name: "Jane Doe", email: "jane@example.com", status: false },
    { name: "Alice Smith", email: "alice@example.com", status: true },
  ];


  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardChart
            icon={<FaArrowUp />}
            title="Data Kesehatan"
            // data="$410.5"
            percentage="1.1%"
            isIncreasing={true}
            type={'radar'}
            series={seriesData}
            labels={["Offline", "Online", "Exception", 'Brow', 'William']}
            colors={["#00E396", "#FEB019", "#FF4560", "#775DD0"]}
        />

        <CardChart
            icon={<FaArrowUp />}
            title="Data Penduduk"
            // data="$410.5"
            percentage="1.1%"
            isIncreasing={true}
            type={'donut'}
            series={[20,20,40]}
            labels={["Offline", "Online", "Exception"]}
            colors={["#775DD0", "#FEB019", "#FF4560"]}
        />

       <CardChart
            icon={<FaArrowUp />}
            title="Data Penduduk"
            // data="$410.5"
            percentage="1.1%"
            isIncreasing={true}
            type={'radialBar'}
            series={[20,20,40]}
            labels={["Offline", "Online", "Exception"]}
            colors={["#775DD0", "#FEB019", "#FF4560"]}
        />

        <CardChart
            icon={<FaArrowUp />}
            title="Data Penduduk"
            // data="$410.5"
            percentage="1.1%"
            isIncreasing={true}
            type={'polarArea'}
            series={[20,20,40]}
            labels={["Offline", "Online", "Exception"]}
            colors={["#775DD0", "#FEB019", "#FF4560"]}
        />
      </div>
      <Spacer size={0.5} />
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="lg:col-span-2  p-6 rounded-lg dark:bg-gray-900 bg-white">
          <h3 className="text-lg font-semibold  mb-4">Total Investment</h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Invested Value</p>
              <p className="text-xl font-bold ">$1,279.95</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Returns</p>
              <p className="text-xl font-bold text-green-500">$22,543.87</p>
            </div>
          </div>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={250}
          />
        </div>

        <div className=" dark:bg-gray-900 bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold  mb-4">My Stocks</h3>
          <div className="space-y-4">
            {[
              {
                name: "Apple Inc",
                shares: 16,
                value: "$410.5",
                change: "0.95%",
                increasing: true,
              },
              {
                name: "Google",
                shares: 100,
                value: "$743.76",
                change: "0.95%",
                increasing: true,
              },
              {
                name: "Tesla",
                shares: 20,
                value: "$234.09",
                change: "-0.95%",
                increasing: false,
              },
              {
                name: "Twitter X",
                shares: 87,
                value: "$410.5",
                change: "0.95%",
                increasing: true,
              },
              {
                name: "Microsoft",
                shares: 37,
                value: "$410.5",
                change: "0.95%",
                increasing: true,
              },
            ].map((stock, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{stock.name}</p>
                  <p className="text-sm text-gray-400">{stock.shares} Shares</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{stock.value}</p>
                  <p
                    className={`text-sm ${
                      stock.increasing ? "text-green-500" : "text-red-500"
                    }`}>
                    {stock.change}{" "}
                    {stock.increasing ? <FaArrowUp /> : <FaArrowDown />}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Spacer size={0.5} />
      <div className="flex justify-center items-center">
            <Card
              title={'Data Donasi'}
              content={
                <>
                  <Table
                    columns={columns}
                    data={data}
                  />
                </>
              }
            />
        </div>
    </div>
  );
}
