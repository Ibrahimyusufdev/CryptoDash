// src/components/SearchBar.jsx
import { useState } from "react";
import { useSearchCrypto } from "../hooks/useCryptoData";
import { useAppStore } from "../store/useAppStore";
import { LoadingSpin } from "./LoadingSpin";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearchCrypto(query);
  const setSelectedCrypto = useAppStore((state) => state.setSelectedCrypto);

  const handleSelect = (coin) => {
    setSelectedCrypto(coin); // save selected coin
    setQuery(""); // clear input
  };

  return (
    <section className="mt-4">
      <article className="container mx-auto px-4">
        <div className="relative w-full max-w-md">
          <input
            type="search"
            placeholder="Search Crypto (e.g. Bitcoin)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border p-2 shadow-sm"
          />

          {/* Suggestions */}
          {query && (
            <ul className="absolute z-10 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-md">
              {isLoading && <li><LoadingSpin /></li>}

              {data?.length === 0 && <li className="p-2">No results found</li>}

              {data?.map((coin) => (
                <li
                  key={coin.id}
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                  onClick={() => handleSelect(coin)}
                >
                  <img src={coin.thumb} alt={coin.name} className="h-5 w-5" />
                  <span>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </section>
  );
};
