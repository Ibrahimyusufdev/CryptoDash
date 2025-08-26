import { useQuery } from "@tanstack/react-query";
import { getStockDetails } from "../services/getStockDetails";

export const useStockDetails = (symbol) =>
  useQuery({
    queryKey: ["stockDetails", symbol],
    queryFn: () => getStockDetails(symbol),
    enabled: !!symbol,
    staleTime: 1000 * 60,
    retry: 1,
  });
