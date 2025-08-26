import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useCryptoHistory } from "../hooks/useCryptoHistory";
import PriceChart from "./PriceChart";
import { LoadingSpin } from "./LoadingSpin";

export const CryptoChartContainer = () => {
  const selectedCrypto = useAppStore((s) => s.selectedCrypto);
  const { data, isLoading, error } = useCryptoHistory(selectedCrypto?.id, 7);

  if (!selectedCrypto) return null;
  if (isLoading) return <LoadingSpin />;
  if (error) return <p className="text-red-500 text-center">Failed to load chart</p>;

  return <PriceChart chartData={data} label={`${selectedCrypto.name} (7d)`} />;
};

export default CryptoChartContainer;
