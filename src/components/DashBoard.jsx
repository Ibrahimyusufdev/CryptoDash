import React, { useState } from "react";
import SearchBar from "./SearchBar";
import StockSearchBar from "./StockSearchBar";
import CryptoCard from "./CryptoCard";
import StockCard from "./StockCard";
import CryptoChartContainer from "./CryptoChartContainer";
import StockChartContainer from "./StockChartContainer";

export const Dashboard = () => {
  const [tab, setTab] = useState("crypto");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Finance Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={() => setTab("crypto")} className={`px-3 py-1 rounded ${tab === "crypto" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>Crypto</button>
            <button onClick={() => setTab("stock")} className={`px-3 py-1 rounded ${tab === "stock" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>Stocks</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {tab === "crypto" && (
          <>
            <SearchBar />
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <CryptoCard />
              <CryptoChartContainer />
            </div>
          </>
        )}

        {tab === "stock" && (
          <>
            <StockSearchBar />
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <StockCard />
              <StockChartContainer />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
