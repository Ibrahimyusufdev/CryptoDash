import React, { useState, useEffect } from "react";
import { Search, TrendingUp, BarChart3, DollarSign, Activity, RefreshCw } from "lucide-react";
import SearchBar from "./SearchBar";
import StockSearchBar from "./StockSearchBar";
import CryptoCard from "./CryptoCard";
import StockCard from "./StockCard";
import CryptoChartContainer from "./CryptoChartContainer";
import StockChartContainer from "./StockChartContainer";
import ThemeToggle from "./ThemeToggle";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("crypto");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh timestamp
  useEffect(() => {
    const interval = setInterval(() => setLastRefresh(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => setLastRefresh(new Date());

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const TabButton = ({ label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 sm:px-4 ${
        isActive
          ? "scale-105 transform bg-blue-500 text-white shadow-lg shadow-blue-500/25"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-blue-500 p-2">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold sm:text-xl">Crypto Dash</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Real-time Market Data</p>
              </div>
            </div>

            {/* Tabs (desktop) */}
            <div className="hidden items-center space-x-2 md:flex">
              <TabButton
                label="Cryptocurrency"
                icon={Activity}
                isActive={activeTab === "crypto"}
                onClick={() => setActiveTab("crypto")}
              />
              <TabButton
                label="Stocks"
                icon={TrendingUp}
                isActive={activeTab === "stock"}
                onClick={() => setActiveTab("stock")}
              />
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* Refresh Info */}
              <div className="hidden items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 sm:flex">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span>Live</span>
                </div>
                <span>•</span>
                <button
                  onClick={handleRefresh}
                  className="flex items-center space-x-1 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{formatLastUpdate(lastRefresh)}</span>
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Tabs (scrollable) */}
        <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden">
          <div className="flex space-x-2 overflow-x-auto px-4 py-2">
            <TabButton
              label="Cryptocurrency"
              icon={Activity}
              isActive={activeTab === "crypto"}
              onClick={() => setActiveTab("crypto")}
            />
            <TabButton
              label="Stocks"
              icon={TrendingUp}
              isActive={activeTab === "stock"}
              onClick={() => setActiveTab("stock")}
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              {activeTab === "crypto" ? "Cryptocurrency" : "Stock Market"} Dashboard
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Track and analyze {activeTab === "crypto" ? "crypto assets" : "stock prices"} in
              real-time
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
              Market Open
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <div className="mb-4 flex items-center space-x-3">
            <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
              <Search className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
            <h3 className="text-sm font-semibold sm:text-base">
              Search {activeTab === "crypto" ? "Cryptocurrencies" : "Stocks"}
            </h3>
          </div>
          {activeTab === "crypto" ? <SearchBar /> : <StockSearchBar />}
        </div>

        {/* Grid */}
        {/* Grid: Details + Chart */}
        {/* Grid: Details + Chart */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {/* Left Card: Details */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold sm:text-lg">
                {activeTab === "crypto" ? "Crypto Details" : "Stock Details"}
              </h3>
              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                Live Data
              </div>
            </div>
            {activeTab === "crypto" ? <CryptoCard /> : <StockCard />}
          </div>

          {/* Right Card: Chart */}
          <div className="mb-20 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          
            <div className="h-64 sm:h-80">
              {activeTab === "crypto" ? <CryptoChartContainer /> : <StockChartContainer />}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 sm:gap-6">
          {[
            {
              title: "Market Status",
              value: "Open",
              change: "+2.34%",
              positive: true,
              icon: Activity,
            },
            {
              title: "Total Volume",
              value: "$1.2B",
              change: "+15.67%",
              positive: true,
              icon: BarChart3,
            },
            {
              title: "Market Cap",
              value: "$2.8T",
              change: "-0.45%",
              positive: false,
              icon: DollarSign,
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-lg font-bold sm:text-xl">{stat.value}</p>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        stat.positive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-700 sm:p-3">
                    <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {[
            {
              title: "Market Status",
              value: "Open",
              change: "+2.34%",
              positive: true,
              icon: Activity,
            },
            {
              title: "Total Volume",
              value: "$1.2B",
              change: "+15.67%",
              positive: true,
              icon: BarChart3,
            },
            {
              title: "Market Cap",
              value: "$2.8T",
              change: "-0.45%",
              positive: false,
              icon: DollarSign,
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-lg font-bold sm:text-xl">{stat.value}</p>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        stat.positive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-700 sm:p-3">
                    <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
  <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:gap-4">
    <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
      © 2025 CryptoDash. Real-time financial data.
    </p>
    <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm flex items-center gap-1">
      Data provided by CoinGecko & Alpha Vantage
    </span>
    <a
      href="https://github.com/ibrahimyusufdev"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm"
    >
      <svg
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.84 1.232 1.912 1.232 3.222 0 4.609-2.807 5.625-5.479 5.921.429.37.813 1.096.813 2.21 0 1.595-.015 2.882-.015 3.27 0 .32.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
          clipRule="evenodd"
        />
      </svg>
      Developed by Ibrahim Yusuf
    </a>
  </div>
</footer>

    </div>
  );
};
