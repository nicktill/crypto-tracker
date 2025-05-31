import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ArrowUpDown, SlidersHorizontal, Check } from "lucide-react";

const FilterControls = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { value: "market_cap_rank", label: "Market Cap Rank", icon: "🏆" },
    { value: "name", label: "Name", icon: "🔤" },
    { value: "current_price", label: "Price", icon: "💰" },
    { value: "market_cap", label: "Market Cap", icon: "📊" },
    { value: "price_change_percentage_24h", label: "24h Change", icon: "📈" },
    { value: "total_volume", label: "Volume", icon: "📊" }
  ];

  const currentOption = sortOptions.find(option => option.value === sortBy);

  return (
    <motion.div 
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Sort Dropdown */}
      <div className="relative">
        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-3 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 min-w-[160px]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SlidersHorizontal size={16} className="text-slate-400" />
          <span className="text-sm font-medium flex-1 text-left">
            {currentOption?.label || "Sort by"}
          </span>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="text-slate-400" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="py-2">
                {sortOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                        {option.label}
                      </span>
                    </div>
                    {sortBy === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-blue-400"
                      >
                        <Check size={16} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Sort Order Toggle */}
      <motion.button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="flex items-center space-x-2 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowUpDown size={16} className="text-slate-400" />
        <span className="text-sm font-medium">
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </span>
        <motion.div
          animate={{ 
            rotateX: sortOrder === 'desc' ? 180 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <div className={`w-2 h-2 rounded-full ${
            sortOrder === 'asc' ? 'bg-emerald-400' : 'bg-orange-400'
          }`}></div>
        </motion.div>
      </motion.button>

      {/* Quick Filter Pills */}
      <div className="flex items-center space-x-2 ml-4">
        <span className="text-xs text-slate-400 font-medium">Quick:</span>
        {[
          { label: "Top 10", action: () => {}, active: false },
          { label: "Gainers", action: () => {}, active: false },
          { label: "Losers", action: () => {}, active: false }
        ].map((filter, index) => (
          <motion.button
            key={filter.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={filter.action}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
              filter.active
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterControls;