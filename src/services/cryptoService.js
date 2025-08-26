import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const searchCrypto = async (query) => {
  if (!query) return [];
  const { data } = await axios.get(`${API_URL}/search?query=${query}`);
  return data.coins; // returns array of coins
};
