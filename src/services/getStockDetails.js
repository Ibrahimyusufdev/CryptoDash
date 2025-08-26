import axios from "axios";

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY || "";

export const getStockDetails = async (symbol) => {
  if (!symbol) throw new Error("Missing symbol");
  if (!API_KEY) throw new Error("Alpha Vantage API key missing (VITE_ALPHA_VANTAGE_KEY)");

  const { data } = await axios.get("https://www.alphavantage.co/query", {
    params: { function: "GLOBAL_QUOTE", symbol, apikey: API_KEY },
  });

  const g = data["Global Quote"];
  if (!g) throw new Error("No data for symbol");

  return {
    symbol: g["01. symbol"],
    price: parseFloat(g["05. price"]),
    change: parseFloat(g["09. change"]),
    changePercent: parseFloat((g["10. change percent"] || "0").replace("%", "")),
    volume: parseInt(g["06. volume"] || "0", 10),
  };
};
