import React, { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useCryptoHistory } from "../hooks/useCryptoHistory";
import PriceChart from "./PriceChart";
import { LoadingSpin } from "./LoadingSpin";
import { TrendingUp } from "lucide-react";

export const CryptoChartContainer = () => {
  const selectedCrypto = useAppStore((s) => s.selectedCrypto);
  const [chartRange, setChartRange] = useState("7D");

  // Map range labels to days for fetching data
  const rangeMapping = { "24H": 1, "7D": 7, "30D": 30, "1Y": 365 };
  const days = rangeMapping[chartRange];

  const { data, isLoading, error } = useCryptoHistory(selectedCrypto?.id, days);

  if (!selectedCrypto) {
    return (
      <div className="flex h-56 sm:h-64 items-center justify-center rounded-2xl border border-dashed 
                      border-gray-300 bg-gray-50 text-center text-gray-500 
                      dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 p-4 sm:p-6">
        📊 Search & select a cryptocurrency to view its price history
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
            {selectedCrypto.name} Price ({chartRange})
          </h3>
        </div>

        {/* Range Buttons */}
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {["24H", "7D", "30D", "1Y"].map((range) => (
            <button
              key={range}
              onClick={() => setChartRange(range)}
              className={`rounded-lg border px-3 py-1 text-xs transition
                ${
                  chartRange === range
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-blue-500 hover:text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-56 sm:h-64">
        <PriceChart chartData={data} label={`${selectedCrypto.name} (${chartRange})`} />
      </div>

      {/* Footer */}
      <div className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 text-right">
        Data powered by CoinGecko API
      </div>
    </div>
  );
};

