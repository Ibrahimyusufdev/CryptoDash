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
    <div className="mt-4 max-w-md mx-auto">
      <input
        className="w-full rounded-md border p-2"
        placeholder="Search Stock (symbol or name)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <ul className="mt-2 max-h-60 overflow-auto rounded-md border bg-white shadow-md">
          {isLoading && <li className="p-2"><LoadingSpin /></li>}
          {error && <li className="p-2 text-red-500">Failed to fetch</li>}
          {!isLoading && !error && data?.length === 0 && <li className="p-2">No results</li>}
          {!isLoading && !error &&
            data?.map((s) => (
              <li key={s.symbol} onClick={() => handleSelect(s)} className="p-2 hover:bg-gray-100 cursor-pointer flex gap-3 items-center">
                <div className="font-medium">{s.symbol}</div>
                <div className="text-gray-500">- {s.name}</div>
              </li>
            ))
          }
        </ul>
      )}
    </div>
  );
};

export default StockSearchBar;
