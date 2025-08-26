import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useCryptoDetails } from "../hooks/useCryptoDetails";
import { LoadingSpin } from "./LoadingSpin";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";

export const CryptoCard = () => {
  const selectedCrypto = useAppStore((s) => s.selectedCrypto);
  const { data, isLoading, error } = useCryptoDetails(selectedCrypto?.id);

  if (!selectedCrypto) {
    return (
      <div className="flex min-h-[14rem] flex-col items-center text-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 transition">
        <span className="text-base sm:text-lg">
          🔍 Search & select a cryptocurrency
        </span>
        <p className="text-xs sm:text-sm mt-1 text-gray-400 dark:text-gray-500">
          Details will appear here
        </p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpin />;
  if (error)
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-600 dark:border-red-700 dark:bg-red-900/40 dark:text-red-400">
        ❌ Could not load crypto details
      </div>
    );

  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(v);

  const priceChange = data?.market_data?.price_change_percentage_24h ?? 0;
  const isUp = priceChange >= 0;

  return (
    <div className="mx-auto w-full max-w-md sm:max-w-2xl lg:max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-lg">
      
      {/* Header Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-6">
        {/* Left: Image + Name */}
        <div className="flex items-center gap-4 col-span-2">
          <img
            src={data.image?.large || data.image?.thumb}
            alt={data.name}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-gray-100 shadow-sm dark:border-gray-600"
          />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
              {data.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide dark:text-gray-400">
              {data.symbol}
            </p>
            <span className="mt-1 inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              Rank #{data.market_cap_rank}
            </span>
          </div>
        </div>

        {/* Right: Favorite */}
        <div className="flex sm:justify-end">
          <button className="p-2 rounded-full hover:bg-gray-100 transition dark:hover:bg-gray-700">
            <Star className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </button>
        </div>
      </div>

      {/* Price Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        <div className="col-span-2">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(data.market_data.current_price.usd)}
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs sm:text-sm">
            {isUp ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`font-semibold ${
                isUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {priceChange.toFixed(2)}%
            </span>
            <span className="text-gray-400 dark:text-gray-500"> (24h)</span>
          </div>
        </div>
      </div>

  {/* Stats Grid */}
<div
  className="
    grid gap-3 sm:gap-4 text-xs sm:text-sm
    grid-cols-[repeat(auto-fit,minmax(140px,1fr))]
  "
>
  {[
    { label: "Market Cap", value: data.market_data.market_cap.usd },
    { label: "24h Volume", value: data.market_data.total_volume.usd },
    { label: "High 24h", value: data.market_data.high_24h.usd },
    { label: "Low 24h", value: data.market_data.low_24h.usd },
  ].map((stat) => (
    <div
      key={stat.label}
      className="rounded-xl bg-gray-50 p-3 sm:p-4 hover:bg-gray-100 transition dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <div className="text-gray-500 text-[10px] sm:text-xs uppercase dark:text-gray-400">
        {stat.label}
      </div>
      <div className="font-semibold text-gray-800 dark:text-gray-100 truncate">
        {formatCurrency(stat.value)}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default CryptoCard;
