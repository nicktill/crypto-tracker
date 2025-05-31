import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, formatMarketCap, formatVolume } from "../../utils/formatters";
import DetailedChart from "../DetailedChart/DetailedChart";

const CoinDetailModal = ({ coin, isOpen, onClose }) => {
  if (!coin) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="glass rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={coin.image} 
                    alt={coin.name}
                    className="w-16 h-16 rounded-full animate-glow"
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-white">{coin.name}</h2>
                    <p className="text-slate-400 text-lg uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">
                    {formatPrice(coin.current_price)}
                  </p>
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl ${
                    (coin.price_change_percentage_24h || 0) > 0 ? 'bg-positive status-positive' : 'bg-negative status-negative'
                  }`}>
                    <svg 
                      className={`h-4 w-4 ${(coin.price_change_percentage_24h || 0) > 0 ? 'rotate-0' : 'rotate-180'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      {(coin.price_change_percentage_24h || 0) > 0 ? '+' : ''}{(coin.price_change_percentage_24h || 0).toFixed(2)}%
                    </span>
                    <span className="text-sm opacity-75">24h</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Market Cap</p>
                      <p className="text-white text-xl font-semibold">{formatMarketCap(coin.market_cap)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">24h Volume</p>
                      <p className="text-white text-xl font-semibold">{formatVolume(coin.total_volume)}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Market Rank</p>
                      <p className="text-white text-xl font-semibold">#{coin.market_cap_rank}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Circulating Supply</p>
                      <p className="text-white text-xl font-semibold">
                        {coin.circulating_supply ? coin.circulating_supply.toLocaleString() : '--'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Price Chart Section */}
                <div className="mt-8">
                  <DetailedChart 
                    coinId={coin.id}
                    isPositive={(coin.price_change_percentage_24h || 0) > 0}
                  />
                </div>
                
                <div className="pt-6 border-t border-slate-700">
                  <p className="text-slate-400 text-center">
                    Click outside or press ESC to close
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CoinDetailModal;