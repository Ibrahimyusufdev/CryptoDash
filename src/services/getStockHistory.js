import axios from "axios";

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY || "";

export const getStockHistory = async (symbol) => {
  if (!symbol) throw new Error("Missing symbol");
  if (!API_KEY) throw new Error("Alpha Vantage API key missing (VITE_ALPHA_VANTAGE_KEY)");

  const { data } = await axios.get("https://www.alphavantage.co/query", {
    params: { function: "TIME_SERIES_DAILY", symbol, outputsize: "compact", apikey: API_KEY },
  });

  const series = data["Time Series (Daily)"];
  if (!series) throw new Error("No time series data");

  // take latest 7 days
  const dates = Object.keys(series).slice(0, 7).reverse();
  return dates.map((d) => ({ date: new Date(d).toLocaleDateString(), price: parseFloat(series[d]["4. close"]) }));
};
