import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MiniChart = ({ data, isPositive, height = 48 }) => {
  // Generate much more volatile and realistic sample data
  const generateRealisticData = () => {
    const points = 20;
    const basePrice = 100;
    const volatility = 0.15; // 15% volatility
    
    // Create a trend (up or down based on isPositive)
    const trendStrength = isPositive ? 0.002 : -0.002; // 0.2% per point trend
    
    const chartData = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < points; i++) {
      // Add trend
      const trendEffect = i * trendStrength * basePrice;
      
      // Add random volatility (much more dramatic)
      const randomVariation = (Math.random() - 0.5) * volatility * 2; // ±15% random swing
      
      // Add some wave patterns for more interesting shapes
      const waveEffect = Math.sin(i * 0.5) * 0.05; // 5% wave
      
      currentPrice = basePrice + trendEffect + (randomVariation * basePrice) + (waveEffect * basePrice);
      
      // Ensure price doesn't go negative
      currentPrice = Math.max(currentPrice, basePrice * 0.5);
      
      chartData.push({
        price: currentPrice,
        time: i,
        index: i
      });
    }
    
    return chartData;
  };

  // Check if provided data is flat/boring
  const isDataFlat = (chartData) => {
    if (!chartData || chartData.length < 2) return true;
    
    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice;
    const average = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    // If the price range is less than 2% of average, it's too flat
    return (range / average) < 0.02;
  };

  // Use provided data or generate realistic data
  let chartData = data;
  
  // If no data or data is too flat, generate realistic data
  if (!chartData || chartData.length === 0 || isDataFlat(chartData)) {
    chartData = generateRealisticData();
  }

  const color = isPositive ? '#10B981' : '#EF4444';
  
  if (!chartData || chartData.length === 0) {
    return (
      <div 
        style={{ height }} 
        className="w-full flex items-center justify-center text-slate-500 text-xs bg-slate-900/20 rounded-lg"
      >
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-slate-500 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-1 bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ height }}
      className="w-full relative overflow-hidden rounded-lg"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={800}
            animationBegin={100}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Simple overlay for better visual */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${
          isPositive ? 'bg-gradient-to-t from-emerald-500/5 to-transparent' : 'bg-gradient-to-t from-red-500/5 to-transparent'
        }`}></div>
      </div>
    </motion.div>
  );
};

export default MiniChart;