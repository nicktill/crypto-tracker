import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MiniChart = ({ data, isPositive, height = 40 }) => {
  if (!data || data.length === 0) {
    // Generate some sample sparkline data if none provided
    const sampleData = Array.from({ length: 20 }, (_, i) => ({
      price: 100 + Math.sin(i * 0.5) * (isPositive ? 10 : -10) + Math.random() * 5
    }));
    data = sampleData;
  }

  const color = isPositive ? '#10B981' : '#EF4444';

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ height }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`miniGradient-${isPositive ? 'positive' : 'negative'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            dot={false}
            fill={`url(#miniGradient-${isPositive ? 'positive' : 'negative'})`}
            animationDuration={1200}
            animationBegin={200}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default MiniChart;
