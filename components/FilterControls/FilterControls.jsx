import { motion } from "framer-motion";

const FilterControls = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <motion.div 
      className="flex flex-wrap gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="glass rounded-xl p-1">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-transparent text-white px-4 py-2 focus:outline-none cursor-pointer"
        >
          <option value="market_cap_rank" className="bg-slate-800">Rank</option>
          <option value="name" className="bg-slate-800">Name</option>
          <option value="current_price" className="bg-slate-800">Price</option>
          <option value="market_cap" className="bg-slate-800">Market Cap</option>
          <option value="price_change_percentage_24h" className="bg-slate-800">24h Change</option>
        </select>
      </div>
      
      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="glass rounded-xl px-4 py-2 hover:bg-slate-700 transition-all duration-300 flex items-center space-x-2"
      >
        <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
        <svg 
          className={`h-4 w-4 transform transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </motion.div>
  );
};

export default FilterControls;