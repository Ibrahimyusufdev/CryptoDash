import { useQuery } from "@tanstack/react-query";
import { getCryptoDetails } from "../services/getCryptoDetails";

export const useCryptoDetails = (id) =>
  useQuery({
    queryKey: ["cryptoDetails", id],
    queryFn: () => getCryptoDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 1,
  });
