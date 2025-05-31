// Utility functions for formatting cryptocurrency data

export const formatPrice = (price) => {
  if (!price) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2
  }).format(price);
};

export const formatMarketCap = (marketCap) => {
  if (!marketCap) return '$0';
  
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString()}`;
};

export const formatVolume = (volume) => {
  if (!volume) return '$0';
  
  if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
  if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
  if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
  return `$${volume.toLocaleString()}`;
};

export const formatPercentage = (percentage) => {
  if (percentage === null || percentage === undefined) return '0.00%';
  
  const formatted = Math.abs(percentage).toFixed(2);
  const sign = percentage >= 0 ? '+' : '-';
  return `${sign}${formatted}%`;
};

export const formatNumber = (number) => {
  if (!number) return '0';
  
  if (number >= 1e9) return `${(number / 1e9).toFixed(1)}B`;
  if (number >= 1e6) return `${(number / 1e6).toFixed(1)}M`;
  if (number >= 1e3) return `${(number / 1e3).toFixed(1)}K`;
  return number.toLocaleString();
};

export const formatSupply = (supply) => {
  if (!supply) return 'N/A';
  
  if (supply >= 1e9) return `${(supply / 1e9).toFixed(2)}B`;
  if (supply >= 1e6) return `${(supply / 1e6).toFixed(2)}M`;
  if (supply >= 1e3) return `${(supply / 1e3).toFixed(2)}K`;
  return supply.toLocaleString();
};