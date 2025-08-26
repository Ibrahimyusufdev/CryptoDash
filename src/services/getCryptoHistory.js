import axios from "axios";

const COINGECKO = import.meta.env.VITE_COINGECKO_API || "https://api.coingecko.com/api/v3";

export const getCryptoHistory = async (id, days = 7) => {
  if (!id) throw new Error("Missing crypto id");
  const { data } = await axios.get(`${COINGECKO}/coins/${id}/market_chart`, {
    params: { vs_currency: "usd", days },
  });
  // returns array of [timestamp, price]
  return (data.prices || []).map(([ts, price]) => ({
    date: new Date(ts).toLocaleDateString(),
    price: Number(price),
  }));
};
