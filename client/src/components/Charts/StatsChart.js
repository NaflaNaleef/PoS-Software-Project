import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const StatsChart = ({ data }) => {
  const chartData = {
    labels: ["Customers", "Products", "Orders"],
    datasets: [
      {
        label: "Total in number",
        data: [data.customers, data.products, data.orders],
        backgroundColor: "#3e95cd",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default StatsChart;
