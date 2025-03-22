import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const SalesChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Amount received",
        data: data.map((item) => item.amount),
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default SalesChart;
