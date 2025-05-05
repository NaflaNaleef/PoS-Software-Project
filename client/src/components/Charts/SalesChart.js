import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ data }) => {
  const chartData = {
    labels: data?.length ? data.map((item) => item.date) : ["No Data"],
    datasets: [
      {
        label: "Sales",
        data: data?.length ? data.map((item) => item.amount) : [0],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#36A2EB",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default SalesChart;
