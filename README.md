# 📊 Stock & Cryptocurrency Dashboard

An enterprise-level **React dashboard app** for monitoring **stocks and cryptocurrencies** in real-time. It features powerful search, market insights, interactive charts, dark mode, and responsive design — making financial tracking simple yet effective.

---

## 🚀 Features

* 🔎 **Smart Search** – Search stocks and cryptos with autocomplete.
* 💰 **Crypto Data** – Price, 24h change, market cap, trading volume.
* 📈 **Stock Data** – Live stock prices, daily changes, key metrics.
* 📊 **Interactive Charts** – Line charts of historical trends (7 days).
* 🌙 **Dark Mode** – Toggle for a modern, accessible UI.
* ⚖️ **Comparison** – Compare multiple assets on one chart.
* 🔄 **Currency Conversion** – Convert prices to multiple fiat currencies.
* 📱 **Responsive Design** – Optimized for desktop & mobile.

---

## 🛠️ Tech Stack

* **Framework**: [React](https://react.dev/)
* **Data Fetching & Caching**: [React Query (TanStack Query)](https://tanstack.com/query/latest)
* **HTTP Client**: [Axios](https://axios-http.com/)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **Charts**: [Recharts](https://recharts.org/en-US)
* **UI & Styling**:

  * [Tailwind CSS](https://tailwindcss.com/)
  * [shadcn/ui](https://ui.shadcn.com/)
* **Icons**: [Lucide React](https://lucide.dev/)


---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ibrahimyusufdev/CryptoDash.git
cd CryptoDash
```

### 2. Install Dependencies

```bash
npm install react-query axios zustand recharts tailwindcss lucide-react @radix-ui/react-icons
```

### 3. Setup Tailwind

```bash
npx tailwindcss init -p
```

Update `tailwind.config.js` to include `./src/**/*.{js,jsx}`

### 4. Setup Environment Variables

Create `.env.local` in root:

```env
REACT_APP_COINGECKO_API=https://api.coingecko.com/api/v3
REACT_APP_ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key
```

⚠️ Add `.env.local` to `.gitignore`

### 5. Run Dev Server

```bash
npm start
```

### 6. Build for Production

```bash
npm run build
```

---

## 📂 Project Structure

```
📂 src
 ┣ 📂 components
 ┃ ┣ SearchBar.jsx
 ┃ ┣ CryptoCard.jsx
 ┃ ┣ StockCard.jsx
 ┃ ┣ PriceChart.jsx
 ┃ ┗ ThemeToggle.jsx
 ┣ 📂 hooks
 ┃ ┣ useCryptoData.js
 ┃ ┗ useStockData.js
 ┣ 📂 store
 ┃ ┗ useAppStore.js
 ┣ 📂 services
 ┃ ┣ cryptoService.js
 ┃ ┗ stockService.js
 ┣ 📂 styles
 ┃ ┗ index.css
 ┗ App.jsx
```

---

## 🧑‍💻 Contributing

Contributions are welcome! Fork the repo, create a new branch, and submit a PR.

---

## 📄 License

Licensed under the **MIT License**.

---

This setup makes it **production-friendly**:

* React Query handles caching & refetching automatically.
* Axios keeps API calls clean.
* Zustand is super lightweight for UI/global states.
* Recharts works great for market data visualization.
