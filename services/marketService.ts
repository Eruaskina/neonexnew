
import { Currency } from "../types";

const COINGECKO_API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h";

export const fetchLiveMarketData = async (): Promise<Currency[]> => {
  try {
    const response = await fetch(COINGECKO_API);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    return data.map((item: any) => ({
      id: item.id,
      symbol: item.symbol.toUpperCase(),
      name: item.name,
      price: item.current_price,
      change24h: item.price_change_percentage_24h || 0,
      marketCap: formatMarketCap(item.market_cap),
      type: 'crypto',
      history: item.sparkline_in_7d?.price.slice(-20).map((p: number, i: number) => ({
        time: `${i}:00`,
        price: p
      })) || []
    }));
  } catch (error) {
    console.error("Market data fetch failed:", error);
    return [];
  }
};

const formatMarketCap = (val: number): string => {
  if (val >= 1e12) return (val / 1e12).toFixed(1) + "T";
  if (val >= 1e9) return (val / 1e9).toFixed(1) + "B";
  if (val >= 1e6) return (val / 1e6).toFixed(1) + "M";
  return val.toLocaleString();
};
