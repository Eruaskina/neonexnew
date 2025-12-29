
export type Language = 'EN' | 'TR';

export interface Currency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: string;
  type: 'crypto' | 'forex';
  history: { time: string; price: number }[];
}

export interface PortfolioItem {
  id: string;
  amount: number;
  addedAt: number;
}

export interface AppState {
  watchlist: string[];
  portfolio: PortfolioItem[];
  theme: 'cyber' | 'dark';
  language: Language;
}

export enum ViewMode {
  MARKET = 'MARKET',
  PORTFOLIO = 'PORTFOLIO',
  WATCHLIST = 'WATCHLIST',
  ANALYSIS = 'ANALYSIS'
}
