import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, Clock } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search cryptocurrencies...", suggestions = [] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Mock recent searches and trending for demo
  const recentSearches = ["Bitcoin", "Ethereum", "Solana"];
  const trendingSearches = ["Pepe", "Arbitrum", "Polygon", "Chainlink"];

  const handleClear = () => {
    onChange({ target: { value: '' } });
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.parentNode.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <motion.div 
        className={`relative overflow-hidden transition-all duration-300 ${
          isFocused 
            ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20' 
            : 'hover:shadow-md'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px'
        }}
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.02 }}
      >
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <motion.div
            animate={{ 
              rotate: isFocused ? 90 : 0,
              scale: isFocused ? 1.1 : 1 
            }}
            transition={{ duration: 0.2 }}
          >
            <Search 
              className={`h-5 w-5 transition-colors duration-300 ${
                isFocused ? 'text-blue-400' : 'text-slate-400'
              }`} 
            />
          </motion.div>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none transition-all duration-300"
          style={{ fontSize: '16px' }} // Prevents zoom on mobile
        />

        {/* Clear Button */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors duration-200"
            >
              <X size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Shimmer effect */}
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
            isFocused ? 'translate-x-full' : '-translate-x-full'
          }`}></div>
        </div>

        {/* Border glow effect */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 -z-10 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
        </div>
      </motion.div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && !value && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-400">Recent Searches</span>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={search}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              {!value && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp size={16} className="text-emerald-400" />
                    <span className="text-sm font-medium text-slate-400">Trending</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {trendingSearches.map((search, index) => (
                      <motion.button
                        key={search}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(search)}
                        className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results message when typing */}
              {value && (
                <div className="text-center py-8 text-slate-400">
                  <Search size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    Press Enter to search for "{value}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;