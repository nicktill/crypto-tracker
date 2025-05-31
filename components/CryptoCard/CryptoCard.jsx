import { motion } from "framer-motion";
import { formatPrice, formatMarketCap } from "../../utils/formatters";

const CryptoCard = ({ coin, index, onClick }) => {
  const isPositive = coin.price_change_percentage_24h > 0;
  
  return (
    <motion.div
      className="group cursor-pointer"
      onClick={() => onClick(coin)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-2xl hover:shadow-blue-500/[0.05]">
        
        {/* Top Row - Icon + Rank */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="w-14 h-14 rounded-full"
              onError={(e) => {
                e.target.src = '/placeholder-coin.png';
              }}
            />
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {coin.name}
              </h3>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                {coin.symbol}
              </p>
            </div>
          </div>
          
          <div className="text-slate-500 text-sm font-medium">
            #{coin.market_cap_rank}
          </div>
        </div>

        {/* Price */}
        <div className="mb-8">
          <p className="text-4xl font-bold text-white mb-4">
            {formatPrice(coin.current_price)}
          </p>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            isPositive 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {isPositive ? '↗' : '↘'} {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
          </div>
        </div>

        {/* Market Cap */}
        <div className="pt-6 border-t border-white/[0.05]">
          <p className="text-slate-400 text-sm font-medium mb-2">Market Cap</p>
          <p className="text-white text-xl font-bold">
            {formatMarketCap(coin.market_cap)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;