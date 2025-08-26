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
  Filler,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  Title
);

export const PriceChart = ({ chartData, label = "Price (USD)" }) => {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        No data available 📉
      </div>
    );
  }

  const data = {
    labels: chartData.map((d) => d.date),
    datasets: [
      {
        label,
        data: chartData.map((d) => d.price),
        borderColor: "rgba(59,130,246,1)", // Tailwind blue-500
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(59,130,246,0.25)");
          gradient.addColorStop(1, "rgba(59,130,246,0)");
          return gradient;
        },
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827", // dark tooltip
        titleColor: "#fff",
        bodyColor: "#d1d5db",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) =>
            `$${context.parsed.y.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 6,
          color: "#6b7280", // gray-500
        },
      },
      y: {
        grid: { color: "rgba(209,213,219,0.2)" }, // subtle grid
        ticks: {
          color: "#6b7280",
          callback: (val) => `$${val}`,
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="mx-auto h-72 w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      {/* Chart Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Interactive chart
        </span>
      </div>

      {/* Line Chart */}
      <Line data={data} options={options} />
    </div>
  );
};

