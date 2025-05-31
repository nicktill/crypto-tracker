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
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
        // Fallback to mock data if API fails
        setCoins([]);
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
        {/* Header */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold gradient-text mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            Crypto Tracker
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Track, analyze, and manage your cryptocurrency portfolio with real-time data and beautiful insights
          </motion.p>
        </motion.header>

        <div className="space-y-8">
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
          <StatsSection coins={coins} />

          {/* Portfolio Section */}
          <PortfolioSection />

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