import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useStockHistory } from "../hooks/useStockHistory";
import PriceChart from "./PriceChart";
import { LoadingSpin } from "./LoadingSpin";

export const StockChartContainer = () => {
  const selectedStock = useAppStore((s) => s.selectedStock);
  const { data, isLoading, error } = useStockHistory(selectedStock?.symbol);

  if (!selectedStock) return null;
  if (isLoading) return <LoadingSpin />;
  if (error) return <p className="text-red-500 text-center">Failed to load chart</p>;

  return <PriceChart chartData={data} label={`${selectedStock.symbol} (7d)`} />;
};

export default StockChartContainer;
