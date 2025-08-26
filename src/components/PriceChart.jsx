import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export const PriceChart = ({ chartData, label = "Price (USD)" }) => {
  if (!chartData || chartData.length === 0) return null;

  const data = {
    labels: chartData.map((d) => d.date),
    datasets: [
      {
        label,
        data: chartData.map((d) => d.price),
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.12)",
        tension: 0.3,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { maxTicksLimit: 7 } },
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="mx-auto max-w-2xl h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default PriceChart;
