

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsChart = ({ data }) => {
  const chartData = {
    labels: data?.length ? data.map((item) => item.label) : ["No Data"],
    datasets: [
      {
        label: "Stats",
        data: data?.length ? data.map((item) => item.value) : [0],
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default StatsChart;
