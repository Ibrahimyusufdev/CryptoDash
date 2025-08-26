import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useStockDetails } from "../hooks/useStockDetails";
import { LoadingSpin } from "./LoadingSpin";

export const StockCard = () => {
  const selectedStock = useAppStore((s) => s.selectedStock);
  const { data, isLoading, error } = useStockDetails(selectedStock?.symbol);

  if (!selectedStock) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-4 sm:p-6 text-center">
        🔎 Search and select a stock to view details
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 p-4 sm:p-6">
        <LoadingSpin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-red-200 bg-red-50 dark:border-red-500/40 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 sm:p-6 text-center">
        ❌ Failed to load stock details
      </div>
    );
  }

  const currencyFormat = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {data.symbol}
      </h2>

      {/* Stats */}
      <div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-semibold">{currencyFormat(data.price)}</span>
        </div>
        <div className="flex justify-between">
          <span>Daily Change:</span>
          <span className={data.change >= 0 ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
            {data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="flex justify-between">
          <span>Volume:</span>
          <span>{data.volume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

