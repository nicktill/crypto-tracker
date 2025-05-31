import { motion } from "framer-motion";
import { formatPrice, formatMarketCap, formatVolume } from "../../utils/formatters";
import MiniChart from "../MiniChart/MiniChart";

const CryptoCard = ({ coin, index, onClick }) => {
  const isPositive = coin.price_change_percentage_24h > 0;
  
  return (
    <motion.div
      className="glass glass-hover rounded-2xl p-6 cursor-pointer card-hover"
      onClick={() => onClick(coin)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-3">
            <span className="text-slate-400 font-medium text-sm w-8">
              #{coin.market_cap_rank}
            </span>
            <img 
              src={coin.image} 
              alt={coin.name}
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                e.target.src = '/placeholder-coin.png'; // Add a placeholder image
              }}
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-white">{coin.name}</h3>
            <p className="text-slate-400 text-sm uppercase">{coin.symbol}</p>
          </div>
        </div>
        
        {/* Mini Chart */}
        <div className="hidden md:block w-24 h-12 mx-4">
          <MiniChart 
            data={coin.sparkline_in_7d?.price?.map((price, index) => ({ price, index })) || null}
            isPositive={isPositive}
            height={48}
          />
        </div>
        
        <div className="text-right space-y-1">
          <p className="font-bold text-xl text-white">
            {formatPrice(coin.current_price)}
          </p>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
              isPositive ? 'bg-positive status-positive' : 'bg-negative status-negative'
            }`}>
              <svg 
                className={`h-3 w-3 ${isPositive ? 'rotate-0' : 'rotate-180'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">
                {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-sm">
        <div>
          <p className="text-slate-400">Market Cap</p>
          <p className="text-white font-medium">{formatMarketCap(coin.market_cap)}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400">Volume 24h</p>
          <p className="text-white font-medium">{formatVolume(coin.total_volume)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;