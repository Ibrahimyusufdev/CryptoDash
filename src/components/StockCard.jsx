import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useStockDetails } from "../hooks/useStockDetails";
import { LoadingSpin } from "./LoadingSpin";

export const StockCard = () => {
  const selectedStock = useAppStore((s) => s.selectedStock);

  const { data, isLoading, error } = useStockDetails(selectedStock?.symbol);

  if (!selectedStock) {
    return <p className="text-center text-gray-500">Search and select a stock to view details.</p>;
  }

  if (isLoading) return <LoadingSpin />;
  if (error) return <p className="text-red-500 text-center">Failed to load stock</p>;

  const currencyFormat = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-2">{data.symbol}</h2>
      <div className="space-y-2">
        <div>Price: {currencyFormat(data.price)}</div>
        <div>Daily Change: <span className={data.change >= 0 ? "text-green-600" : "text-red-600"}>{data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)</span></div>
        <div>Volume: {data.volume.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default StockCard;
