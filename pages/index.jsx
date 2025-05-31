import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/SearchBar/SearchBar";
import CoinList from "../components/CoinList/CoinList";
import FilterControls from "../components/FilterControls/FilterControls";
import StatsSection from "../components/StatsSections/StatsSection";
import PortfolioSection from "../components/PortfolioSection/PortfolioSection";
import WatchlistSection from "../components/WatchListSection/WatchlistSection";
import CoinDetailModal from "../components/CoinDetailModal/CoinDetailModal";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch cryptocurrency data
  useEffect(() => {
    async function fetchCoins() {
      try {
        setLoading(true);
        // Try our API route first, then fallback to direct CoinGecko
        const res = await fetch("/api/coins");
        if (!res.ok) {
          throw new Error('API route failed');
        }
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
        // Fallback to direct CoinGecko API
        try {
          const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
          );
          const data = await res.json();
          setCoins(data);
        } catch (fallbackError) {
          console.error("Fallback API also failed:", fallbackError);
          setCoins([]);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  // Filter and sort coins
  const filteredAndSortedCoins = coins
    .filter(coin => 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedCoin(null), 300);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        handleCloseModal();
      }
    };
    document.addEventListener('keydown', handleEsc, false);
    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <motion.section 
          className="relative mb-20 py-20 text-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <motion.div
            className="relative z-10 max-w-6xl mx-auto px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                CryptoVault
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-slate-300 mb-12 font-light max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Track cryptocurrency prices, monitor your portfolio, and discover market trends{" "}
              <span className="text-emerald-400 font-semibold">in real-time</span>
            </motion.p>

            <motion.div
              className="flex justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button 
                onClick={() => {
                  const searchSection = document.querySelector('[data-search-section]');
                  if (searchSection) {
                    searchSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-xl text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Start Tracking Crypto</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>

        <div className="space-y-8" data-search-section>
          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <FilterControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          {/* Crypto List */}
          <CoinList 
            coins={filteredAndSortedCoins}
            loading={loading}
            onCoinClick={handleCoinClick}
          />

          {/* Stats Section */}
          <div data-stats-section>
            <StatsSection coins={coins} />
          </div>

          {/* Portfolio Section */}
          <div data-portfolio-section>
            <PortfolioSection coins={coins} />
          </div>

          {/* Watchlist Section */}
          <WatchlistSection 
            coins={coins.slice(0, 6)} 
            onCoinClick={handleCoinClick}
          />
        </div>

        {/* Coin Detail Modal */}
        <CoinDetailModal
          coin={selectedCoin}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </Layout>
  );
}