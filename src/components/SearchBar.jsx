import React, { useState } from "react";
import { useSearchCrypto } from "../hooks/useSearchCrypto";
import { useAppStore } from "../store/useAppStore";
import { LoadingSpin } from "./LoadingSpin";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchCrypto(query);
  const setSelectedCrypto = useAppStore((s) => s.setSelectedCrypto);

  const handleSelect = (coin) => {
    setSelectedCrypto(coin);
    setQuery("");
  };

  return (
    <div className="mx-auto mt-4 max-w-md">
      <input
        className="w-full rounded-md border p-2 text-gray-800 placeholder-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        placeholder="Search Crypto (name or symbol)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <ul className="z-10 mt-2 max-h-60 overflow-auto rounded-md border bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
          {isLoading && (
            <li className="p-2">
              <LoadingSpin />
            </li>
          )}
          {error && <li className="p-2 text-red-500">Failed to fetch</li>}
          {!isLoading && !error && data?.length === 0 && (
            <li className="p-2 text-gray-500">No results</li>
          )}
          {!isLoading &&
            !error &&
            data?.map((c) => (
              <li
                key={c.id}
                onClick={() => handleSelect(c)}
                className="flex cursor-pointer items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <img src={c.thumb} alt={c.symbol} className="h-5 w-5 rounded-full" />
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {c.name}{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({c.symbol.toUpperCase()})
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {c.market_cap_rank ? `#${c.market_cap_rank}` : ""}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
