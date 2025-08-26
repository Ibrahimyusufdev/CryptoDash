import axios from "axios";

const COINGECKO = import.meta.env.VITE_COINGECKO_API || "https://api.coingecko.com/api/v3";

export const searchCryptos = async (query) => {
  if (!query) return [];
  const { data } = await axios.get(`${COINGECKO}/search`, { params: { query } });
  return (data.coins || []).map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    thumb: coin.thumb,
    large: coin.large || coin.thumb,
    market_cap_rank: coin.market_cap_rank,
  }));
};
