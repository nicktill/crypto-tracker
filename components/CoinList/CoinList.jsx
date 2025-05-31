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
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Market Overview
        </h2>
        <p className="text-xl text-slate-400">
          {coins.length} cryptocurrencies • Live data
        </p>
      </motion.div>

      {/* Clean Grid Layout */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
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