import { useQuery } from "@tanstack/react-query";
import { getStockHistory } from "../services/getStockHistory";

export const useStockHistory = (symbol) =>
  useQuery({
    queryKey: ["stockHistory", symbol],
    queryFn: () => getStockHistory(symbol),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 5,
  });
