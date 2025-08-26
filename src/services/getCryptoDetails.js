import axios from "axios";

const COINGECKO = import.meta.env.VITE_COINGECKO_API || "https://api.coingecko.com/api/v3";

export const getCryptoDetails = async (id) => {
  if (!id) throw new Error("Missing crypto id");
  const { data } = await axios.get(`${COINGECKO}/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
  return data;
};
