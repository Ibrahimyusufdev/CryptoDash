import { useQuery } from "@tanstack/react-query";
import { searchStocks } from "../services/searchStocks";

export const useStockSearch = (query) =>
  useQuery({
    queryKey: ["searchStock", query],
    queryFn: () => searchStocks(query),
    enabled: !!query && query.trim().length > 0,
    keepPreviousData: true,
    staleTime: 1000 * 10,
  });
