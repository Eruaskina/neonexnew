
import { Currency } from './types';

export const INITIAL_CURRENCIES: Currency[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 64231.50,
    change24h: 2.45,
    marketCap: '1.2T',
    type: 'crypto',
    history: generateMockHistory(64231.50)
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3452.12,
    change24h: -1.2,
    marketCap: '412B',
    type: 'crypto',
    history: generateMockHistory(3452.12)
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 142.85,
    change24h: 5.8,
    marketCap: '62B',
    type: 'crypto',
    history: generateMockHistory(142.85)
  },
  {
    id: 'shiba-inu',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    price: 0.00002415,
    change24h: 12.4,
    marketCap: '14.2B',
    type: 'crypto',
    history: generateMockHistory(0.00002415)
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.1624,
    change24h: -4.2,
    marketCap: '23.1B',
    type: 'crypto',
    history: generateMockHistory(0.1624)
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'XRP Ripple',
    price: 0.5241,
    change24h: 0.8,
    marketCap: '29B',
    type: 'crypto',
    history: generateMockHistory(0.5241)
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.4512,
    change24h: -2.1,
    marketCap: '16B',
    type: 'crypto',
    history: generateMockHistory(0.4512)
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 35.62,
    change24h: 3.4,
    marketCap: '13.5B',
    type: 'crypto',
    history: generateMockHistory(35.62)
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 7.12,
    change24h: -0.5,
    marketCap: '10.2B',
    type: 'crypto',
    history: generateMockHistory(7.12)
  },
  {
    id: 'chainlink',
    symbol: 'LINK',
    name: 'Chainlink',
    price: 18.45,
    change24h: 6.2,
    marketCap: '10.8B',
    type: 'crypto',
    history: generateMockHistory(18.45)
  },
  {
    id: 'polygon',
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.7245,
    change24h: -1.8,
    marketCap: '7.1B',
    type: 'crypto',
    history: generateMockHistory(0.7245)
  },
  {
    id: 'near-protocol',
    symbol: 'NEAR',
    name: 'NEAR Protocol',
    price: 6.84,
    change24h: 9.1,
    marketCap: '7.3B',
    type: 'crypto',
    history: generateMockHistory(6.84)
  },
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: 1.0842,
    change24h: 0.05,
    marketCap: 'N/A',
    type: 'forex',
    history: generateMockHistory(1.0842)
  },
  {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    price: 1.2654,
    change24h: -0.12,
    marketCap: 'N/A',
    type: 'forex',
    history: generateMockHistory(1.2654)
  },
  {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Yen',
    price: 156.42,
    change24h: 0.24,
    marketCap: 'N/A',
    type: 'forex',
    history: generateMockHistory(156.42)
  },
  {
    id: 'gold',
    symbol: 'XAU/USD',
    name: 'Gold / US Dollar',
    price: 2321.40,
    change24h: 0.85,
    marketCap: '14T',
    type: 'forex',
    history: generateMockHistory(2321.40)
  },
  {
    id: 'silver',
    symbol: 'XAG/USD',
    name: 'Silver / US Dollar',
    price: 28.42,
    change24h: 1.15,
    marketCap: '1.4T',
    type: 'forex',
    history: generateMockHistory(28.42)
  }
];

function generateMockHistory(base: number) {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    price: base * (1 + (Math.random() * 0.1 - 0.05))
  }));
}
