import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

const DetailedChart = ({ coinId, isPositive }) => {
  const [timeFrame, setTimeFrame] = useState('7');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const timeFrames = [
    { label: '24H', value: '1' },
    { label: '7D', value: '7' },
    { label: '30D', value: '30' },
    { label: '90D', value: '90' },
    { label: '1Y', value: '365' }
  ];

  const fetchChartData = async (days) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await response.json();
      
      const formattedData = data.prices.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleDateString(),
        price: price,
        timestamp
      }));
      
      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
    fetchChartData(newTimeFrame);
  };

  // Load initial chart data
  useEffect(() => {
    if (coinId) {
      fetchChartData('7');
    }
  }, [coinId]);

  const color = isPositive ? '#10B981' : '#EF4444';
  const backgroundColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-2xl"
        >
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-white font-bold text-lg">
            ${payload[0].value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            })}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Time Frame Selector */}
      <div className="flex justify-center space-x-2">
        {timeFrames.map((tf) => (
          <motion.button
            key={tf.value}
            onClick={() => handleTimeFrameChange(tf.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              timeFrame === tf.value
                ? 'bg-slate-700 text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/70 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tf.label}
          </motion.button>
        ))}
      </div>

      {/* Chart Container */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 border-2 border-slate-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="detailedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={color}
                  strokeWidth={3}
                  dot={false}
                  fill="url(#detailedGradient)"
                  activeDot={{ 
                    r: 6, 
                    fill: color, 
                    stroke: '#ffffff',
                    strokeWidth: 3,
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
                  }}
                  animationDuration={1500}
                  animationBegin={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DetailedChart;
