import { motion } from "framer-motion";
import { formatPrice, formatMarketCap, formatVolume } from "../../utils/formatters";
import { TrendingUp, TrendingDown, Star, MoreVertical, ArrowUpRight, ArrowDownRight } from "lucide-react";
import MiniChart from "../MiniChart/MiniChart";

const CryptoCard = ({ coin, index, onClick }) => {
  const isPositive = coin.price_change_percentage_24h > 0;
  
  return (
    <motion.div
      className="group relative overflow-hidden"
      onClick={() => onClick(coin)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      {/* Main Card */}
      <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10">
        
        {/* Rank Badge */}
        <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
            #{coin.market_cap_rank}
          </span>
        </div>

        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={coin.image} 
                alt={coin.name}
                className="w-12 h-12 rounded-full ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = '/placeholder-coin.png';
                }}
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {coin.name}
                </h3>
                <motion.button
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to watchlist functionality
                  }}
                >
                  <Star size={16} className="text-slate-400 hover:text-yellow-400" />
                </motion.button>
              </div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                {coin.symbol}
              </p>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-3 mb-2">
            <span className="text-3xl font-bold text-white">
              {formatPrice(coin.current_price)}
            </span>
            <motion.div 
              className={`flex items-center space-x-1 px-3 py-1 rounded-full font-medium ${
                isPositive 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isPositive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              <span className="text-sm">
                {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
              </span>
            </motion.div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-6 h-16 relative overflow-hidden rounded-lg bg-slate-900/30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <MiniChart 
            data={coin.sparkline_in_7d?.price?.map((price, index) => ({ price, index })) || null}
            isPositive={isPositive}
            height={64}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/30 rounded-xl p-3 border border-white/5">
            <p className="text-xs text-slate-400 mb-1 font-medium">Market Cap</p>
            <p className="text-white font-semibold text-sm">
              {formatMarketCap(coin.market_cap)}
            </p>
          </div>
          <div className="bg-slate-900/30 rounded-xl p-3 border border-white/5">
            <p className="text-xs text-slate-400 mb-1 font-medium">Volume 24h</p>
            <p className="text-white font-semibold text-sm">
              {formatVolume(coin.total_volume)}
            </p>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
          <motion.button
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // More options functionality
            }}
          >
            <MoreVertical size={16} className="text-white" />
          </motion.button>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;