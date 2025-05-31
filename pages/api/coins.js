// Next.js API route to proxy CoinGecko API calls and avoid CORS issues
// In-memory cache to reduce API calls
let cache = {
  data: null,
  timestamp: 0,
  CACHE_DURATION: 60000, // 1 minute
};

// Store last successful API response for rate limit fallback
let lastSuccessfulData = null;

// Mock data fallback for rate limiting scenarios
const mockCryptoData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 67234.45,
    market_cap: 1324567890123,
    market_cap_rank: 1,
    fully_diluted_valuation: 1412345678901,
    total_volume: 23456789012,
    high_24h: 68234.56,
    low_24h: 66123.45,
    price_change_24h: 1234.56,
    price_change_percentage_24h: 1.87,
    market_cap_change_24h: 12345678901,
    market_cap_change_percentage_24h: 0.94,
    circulating_supply: 19678912.0,
    total_supply: 21000000.0,
    max_supply: 21000000.0,
    ath: 73738.0,
    ath_change_percentage: -8.82,
    ath_date: "2024-03-14T07:10:36.635Z",
    atl: 67.81,
    atl_change_percentage: 99090.44,
    atl_date: "2013-07-06T00:00:00.000Z",
    last_updated: "2025-05-31T12:00:00.000Z",
    sparkline_in_7d: {
      price: [65000, 66000, 65500, 67000, 67500, 67200, 67234]
    }
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3234.56,
    market_cap: 388901234567,
    market_cap_rank: 2,
    fully_diluted_valuation: 388901234567,
    total_volume: 12345678901,
    high_24h: 3298.45,
    low_24h: 3189.12,
    price_change_24h: 45.67,
    price_change_percentage_24h: 1.43,
    market_cap_change_24h: 5467890123,
    market_cap_change_percentage_24h: 1.43,
    circulating_supply: 120280996.0,
    total_supply: 120280996.0,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -33.72,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 746637.36,
    atl_date: "2015-10-20T00:00:00.000Z",
    last_updated: "2025-05-31T12:00:00.000Z",
    sparkline_in_7d: {
      price: [3100, 3150, 3200, 3250, 3300, 3280, 3234]
    }
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 589.12,
    market_cap: 87654321098,
    market_cap_rank: 3,
    fully_diluted_valuation: 87654321098,
    total_volume: 1234567890,
    high_24h: 598.45,
    low_24h: 582.34,
    price_change_24h: 6.78,
    price_change_percentage_24h: 1.16,
    market_cap_change_24h: 1012345678,
    market_cap_change_percentage_24h: 1.17,
    circulating_supply: 148893819.0,
    total_supply: 148893819.0,
    max_supply: 200000000.0,
    ath: 686.31,
    ath_change_percentage: -14.16,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 0.0398177,
    atl_change_percentage: 1479321.88,
    atl_date: "2017-10-19T00:00:00.000Z",
    last_updated: "2025-05-31T12:00:00.000Z",
    sparkline_in_7d: {
      price: [570, 575, 580, 585, 590, 592, 589]
    }
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 142.67,
    market_cap: 67456789012,
    market_cap_rank: 4,
    fully_diluted_valuation: 67456789012,
    total_volume: 2345678901,
    high_24h: 148.23,
    low_24h: 139.45,
    price_change_24h: 3.22,
    price_change_percentage_24h: 2.31,
    market_cap_change_24h: 1545678901,
    market_cap_change_percentage_24h: 2.34,
    circulating_supply: 472849369.0,
    total_supply: 472849369.0,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -45.12,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 28393.45,
    atl_date: "2020-05-11T19:35:23.449Z",
    last_updated: "2025-05-31T12:00:00.000Z",
    sparkline_in_7d: {
      price: [135, 138, 140, 142, 145, 144, 142]
    }
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.456789,
    market_cap: 16789012345,
    market_cap_rank: 5,
    fully_diluted_valuation: 20545678901,
    total_volume: 456789012,
    high_24h: 0.467890,
    low_24h: 0.445678,
    price_change_24h: 0.012345,
    price_change_percentage_24h: 2.78,
    market_cap_change_24h: 454678901,
    market_cap_change_percentage_24h: 2.78,
    circulating_supply: 36778070538.0,
    total_supply: 45000000000.0,
    max_supply: 45000000000.0,
    ath: 3.09,
    ath_change_percentage: -85.23,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 2272.45,
    atl_date: "2020-03-13T02:22:55.391Z",
    last_updated: "2025-05-31T12:00:00.000Z",
    sparkline_in_7d: {
      price: [0.43, 0.44, 0.45, 0.46, 0.47, 0.46, 0.456]
    }
  }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { vs_currency = 'usd', order = 'market_cap_desc', per_page = 100, page = 1, sparkline = 'true', price_change_percentage = '24h' } = req.query;
    
    // Check cache first
    const now = Date.now();
    if (cache.data && (now - cache.timestamp) < cache.CACHE_DURATION) {
      console.log('Serving from cache');
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
      return res.status(200).json(cache.data);
    }

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=${sparkline}&price_change_percentage=${price_change_percentage}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Crypto-Tracker/1.0'
      }
    });

    if (!response.ok) {
      // Handle rate limiting specifically
      if (response.status === 429) {
        console.log('Rate limited - checking for last successful data');
        
        // First try to use last successful data
        if (lastSuccessfulData) {
          console.log('Serving last successful data due to rate limit');
          res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
          return res.status(200).json(lastSuccessfulData);
        }
        
        // If no last successful data, fall back to mock data
        console.log('No last successful data available, serving mock data');
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
        return res.status(200).json(mockCryptoData);
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Store as last successful data for rate limit fallback
    lastSuccessfulData = data;
    
    // Update cache
    cache.data = data;
    cache.timestamp = now;
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Cache for 30 seconds
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from CoinGecko:', error);
    
    // First try to use last successful data
    if (lastSuccessfulData) {
      console.log('Serving last successful data as fallback');
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
      return res.status(200).json(lastSuccessfulData);
    }
    
    // If no last successful data, fall back to mock data
    console.log('No last successful data available, serving mock data as fallback');
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
    res.status(200).json(mockCryptoData);
  }
}
