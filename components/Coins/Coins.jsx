import { motion } from "framer-motion";
import CryptoCard from "../CryptoCard/CryptoCard";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const CoinList = ({ coins, loading, onCoinClick }) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (coins.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass rounded-3xl p-12 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No cryptocurrencies found</h3>
          <p className="text-slate-400 text-lg">Try adjusting your search terms or filters</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header with Better Spacing */}
      <motion.div 
        className="flex items-center justify-between py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Market Overview
          </h2>
          <p className="text-slate-400 text-lg">
            {coins.length} cryptocurrencies available
          </p>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 text-sm font-medium">Live</span>
        </div>
      </motion.div>

      {/* Crypto Cards Grid with Better Spacing */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {coins.map((coin, index) => (
          <CryptoCard
            key={coin.id}
            coin={coin}
            index={index}
            onClick={onCoinClick}
          />
        ))}
      </motion.div>

      {/* Load More Section */}
      {coins.length >= 20 && (
        <motion.div 
          className="text-center pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Load More Cryptocurrencies
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CoinList;