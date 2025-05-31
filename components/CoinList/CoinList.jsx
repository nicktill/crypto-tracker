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
        className="text-center py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 bg-slate-800 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No cryptocurrencies found</h3>
          <p className="text-slate-400 text-lg">Try adjusting your search terms or filters</p>
        </div>
      </motion.div>
    );
  }
  return (
    <div className="space-y-16">
      {/* Enhanced Section Header */}
      <motion.div 
        className="text-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              Market Overview
            </span>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 blur-2xl -z-10 rounded-3xl"></div>
          </h2>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-300 font-semibold">{coins.length} cryptocurrencies</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-slate-300 font-semibold">Live data</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-slate-300 font-semibold">Real-time updates</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Grid Layout */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-8xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
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
    </div>
  );
};

export default CoinList;