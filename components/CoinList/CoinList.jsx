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
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass rounded-2xl p-8">
          <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">No cryptocurrencies found</h3>
          <p className="text-slate-400">Try adjusting your search terms or filters</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
  );
};

export default CoinList;