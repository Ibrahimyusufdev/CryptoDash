import axios from "axios";

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY || "";

export const searchStocks = async (query) => {
  if (!query) return [];
  if (!API_KEY) {
    console.warn("Alpha Vantage API key missing!");
    return [];
  }

  try {
    const { data } = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: query,
        apikey: API_KEY,
      },
    });

    const matches = data?.bestMatches || [];
    return matches.map((m) => ({
      symbol: m["1. symbol"],
      name: m["2. name"],
      region: m["4. region"],
    }));
  } catch (error) {
    console.error("Error searching stocks:", error);
    return [];
  }
};
