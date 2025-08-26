import { useQuery } from "@tanstack/react-query";
import { getCryptoHistory } from "../services/getCryptoHistory";

export const useCryptoHistory = (id, days = 7) =>
  useQuery({
    queryKey: ["cryptoHistory", id, days],
    queryFn: () => getCryptoHistory(id, days),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
