import { useQuery } from "@tanstack/react-query";
import { searchCryptos } from "../services/searchCryptos";

export const useSearchCrypto = (query) =>
  useQuery({
    queryKey: ["searchCrypto", query],
    queryFn: () => searchCryptos(query),
    enabled: !!query && query.trim().length > 0,
    keepPreviousData: true,
    staleTime: 1000 * 10,
  });
