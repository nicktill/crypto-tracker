import { motion } from "framer-motion";

const StatsSection = ({ coins }) => {
  const totalMarketCap = coins.reduce((acc, coin) => acc + (coin.market_cap || 0), 0);
  const totalVolume = coins.reduce((acc, coin) => acc + (coin.total_volume || 0), 0);
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div 
        className="glass rounded-2xl p-6 text-center card-hover"
        whileHover={{ scale: 1.05 }}
      >
        <div className="gradient-text text-3xl font-bold mb-2">
          {coins.length}
        </div>
        <p className="text-slate-400">Cryptocurrencies</p>
      </motion.div>
      
      <motion.div 
        className="glass rounded-2xl p-6 text-center card-hover"
        whileHover={{ scale: 1.05 }}
      >
        <div className="gradient-text text-3xl font-bold mb-2">
          ${(totalMarketCap / 1e12).toFixed(1)}T
        </div>
        <p className="text-slate-400">Total Market Cap</p>
      </motion.div>
      
      <motion.div 
        className="glass rounded-2xl p-6 text-center card-hover"
        whileHover={{ scale: 1.05 }}
      >
        <div className="gradient-text text-3xl font-bold mb-2">
          ${(totalVolume / 1e9).toFixed(1)}B
        </div>
        <p className="text-slate-400">24h Volume</p>
      </motion.div>
    </motion.div>
  );
};

export default StatsSection;