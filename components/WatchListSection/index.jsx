import { motion } from "framer-motion";
import { formatPrice } from "../../utils/formatters";

const WatchlistSection = ({ coins, onCoinClick }) => {
  return (
    <motion.section 
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Watchlist</h2>
          <motion.button 
            className="flex items-center space-x-2 px-4 py-2 glass rounded-xl hover:bg-slate-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add to Watchlist</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((coin, index) => (
            <motion.div
              key={coin.id}
              className="p-4 rounded-xl bg-slate-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 cursor-pointer card-hover"
              onClick={() => onCoinClick(coin)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                <div>
                  <h4 className="font-semibold text-white">{coin.symbol?.toUpperCase()}</h4>
                  <p className="text-xs text-slate-400">{coin.name}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{formatPrice(coin.current_price)}</span>
                <span className={`text-sm font-medium ${
                  (coin.price_change_percentage_24h || 0) > 0 ? 'status-positive' : 'status-negative'
                }`}>
                  {(coin.price_change_percentage_24h || 0) > 0 ? '+' : ''}{(coin.price_change_percentage_24h || 0).toFixed(2)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WatchlistSection;