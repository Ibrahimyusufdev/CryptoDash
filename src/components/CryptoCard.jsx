import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useCryptoDetails } from "../hooks/useCryptoDetails";
import { LoadingSpin } from "./LoadingSpin";

export const CryptoCard = () => {
  const selectedCrypto = useAppStore((s) => s.selectedCrypto);

  // Always call hook to preserve hook order; hook will be disabled when id is falsy
  const { data, isLoading, error } = useCryptoDetails(selectedCrypto?.id);

  if (!selectedCrypto) {
    return <p className="text-center text-gray-500">Search and select a crypto to view details.</p>;
  }

  if (isLoading) return <LoadingSpin />;
  if (error) return <p className="text-red-500 text-center">Failed to load crypto</p>;

  const currencyFormat = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
  const priceChange = data?.market_data?.price_change_percentage_24h ?? 0;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <img src={data.image?.thumb} alt={data.name} className="h-10 w-10" />
        <div>
          <h2 className="text-xl font-bold">{data.name} <span className="text-sm text-gray-500">({data.symbol.toUpperCase()})</span></h2>
          <div className="text-xs text-gray-400">Rank: {data.market_cap_rank}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div>Price: {currencyFormat(data.market_data.current_price.usd)}</div>
        <div>24h Change: <span className={priceChange >= 0 ? "text-green-600" : "text-red-600"}>{priceChange.toFixed(2)}%</span></div>
        <div>Market Cap: {currencyFormat(data.market_data.market_cap.usd)}</div>
        <div>24h Volume: {currencyFormat(data.market_data.total_volume.usd)}</div>
      </div>
    </div>
  );
};

export default CryptoCard;
