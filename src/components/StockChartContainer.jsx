import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useStockHistory } from "../hooks/useStockHistory";
import PriceChart from "./PriceChart";
import { LoadingSpin } from "./LoadingSpin";
import { TrendingUp } from "lucide-react";

export const StockChartContainer = () => {
  const selectedStock = useAppStore((s) => s.selectedStock);
  const { data, isLoading, error } = useStockHistory(selectedStock?.symbol, 7);

  if (!selectedStock) {
    return (
      <div className="flex h-56 sm:h-64 items-center justify-center rounded-2xl border border-dashed 
                      border-gray-300 bg-gray-50 text-center text-gray-500 
                      dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 p-4 sm:p-6">
        📊 Search & select a stock to view its price history
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-56 sm:h-64 items-center justify-center rounded-2xl border border-gray-200 
                      bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 p-4 sm:p-6">
        <LoadingSpin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-6 text-center text-sm sm:text-base text-red-600 
                      dark:border-red-500/40 dark:bg-red-900/20 dark:text-red-400">
        ❌ Failed to load chart data. Please try again.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm 
                    transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            {selectedStock.symbol} Price (7d)
          </h3>
        </div>
        <span className="self-start sm:self-auto rounded-md bg-gray-100 px-2 py-0.5 text-[11px] sm:text-xs text-gray-600 
                         dark:bg-gray-800 dark:text-gray-400">
          vs USD
        </span>
      </div>

      {/* Chart */}
      <div className="h-56 sm:h-64">
        <PriceChart chartData={data} label={`${selectedStock.symbol} (7d)`} />
      </div>

      {/* Footer */}
      <div className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 text-right">
        Data powered by Alpha Vantage API
      </div>
    </div>
  );
};

export default StockChartContainer;
