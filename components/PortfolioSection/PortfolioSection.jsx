import { motion } from "framer-motion";

const PortfolioSection = () => {
  return (
    <motion.section 
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Portfolio Overview</h2>
          <div className="gradient-border">
            <div className="px-6 py-2">
              <span className="gradient-text font-semibold">Coming Soon</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="text-center p-6 rounded-2xl bg-slate-800 bg-opacity-50 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-white mb-2">$0.00</div>
            <p className="text-slate-400">Portfolio Value</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 rounded-2xl bg-slate-800 bg-opacity-50 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold status-positive mb-2">+0.00%</div>
            <p className="text-slate-400">24h Change</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 rounded-2xl bg-slate-800 bg-opacity-50 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-white mb-2">0</div>
            <p className="text-slate-400">Holdings</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 rounded-2xl bg-slate-800 bg-opacity-50 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold status-positive mb-2">+$0.00</div>
            <p className="text-slate-400">Total P&L</p>
          </motion.div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-slate-400 mb-4">Start building your portfolio by tracking your favorite cryptocurrencies</p>
          <motion.button 
            className="gradient-bg px-8 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Holdings
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default PortfolioSection;