import { useQuery } from "@tanstack/react-query";

import { searchCrypto } from "../services/cryptoService.js";


export const useSearchCrypto = (query) => {
  return useQuery({
    queryKey: ["searchCrypto", query],
    queryFn: () => searchCrypto(query),
    enabled: !!query, // only run if query is not empty
    staleTime: 1000 * 60, // 1 min cache
  });
};