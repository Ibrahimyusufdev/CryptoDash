import React, { useState } from "react";
import { useStockSearch } from "../hooks/useStockSearch";
import { useAppStore } from "../store/useAppStore";
import { LoadingSpin } from "./LoadingSpin";

export const StockSearchBar = () => {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useStockSearch(query);
  const setSelectedStock = useAppStore((s) => s.setSelectedStock);

  const handleSelect = (stock) => {
    setSelectedStock(stock);
    setQuery("");
  };

  return (
    <div className="mt-4 max-w-md mx-auto relative">
      {/* Input */}
      <input
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-blue-400"
        placeholder="Search Stock (symbol or name)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Dropdown */}
      {query && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {isLoading && (
            <li className="flex justify-center p-3">
              <LoadingSpin />
            </li>
          )}
          {error && (
            <li className="p-3 text-red-500 dark:text-red-400">
              Failed to fetch results
            </li>
          )}
          {!isLoading && !error && data?.length === 0 && (
            <li className="p-3 text-gray-500 dark:text-gray-400">
              No results found
            </li>
          )}
          {!isLoading &&
            !error &&
            data?.map((s) => (
              <li
                key={s.symbol}
                onClick={() => handleSelect(s)}
                className="flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {s.symbol}
                </span>
                <span className="text-gray-500 dark:text-gray-400 truncate ml-2">
                  {s.name}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default StockSearchBar;
