import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Users, Activity } from "lucide-react";

const StatsSection = ({ coins }) => {
  // Calculate totals with proper validation
  const totalMarketCap = coins.reduce((acc, coin) => {
    const marketCap = coin.market_cap;
    return acc + (marketCap && !isNaN(marketCap) ? marketCap : 0);
  }, 0);
  
  const totalVolume = coins.reduce((acc, coin) => {
    const volume = coin.total_volume;
    return acc + (volume && !isNaN(volume) ? volume : 0);
  }, 0);
  
  // Calculate gainers and losers properly
  const coinsWithValidChange = coins.filter(coin => 
    coin.price_change_percentage_24h !== null && 
    coin.price_change_percentage_24h !== undefined &&
    !isNaN(coin.price_change_percentage_24h)
  );
  
  const gainers = coinsWithValidChange.filter(coin => coin.price_change_percentage_24h > 0);
  const losers = coinsWithValidChange.filter(coin => coin.price_change_percentage_24h < 0);
  
  // Format large numbers properly
  const formatLargeNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    return `$${num.toLocaleString()}`;
  };

  const stats = [
    {
      title: "Cryptocurrencies",
      value: coins.length,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      formatter: (val) => val.toString(),
      description: "Active tokens tracked"
    },
    {
      title: "Total Market Cap",
      value: totalMarketCap,
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      formatter: formatLargeNumber,
      description: "Combined market value"
    },
    {
      title: "24h Volume",
      value: totalVolume,
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10 border-purple-500/20",
      formatter: formatLargeNumber,
      description: "Trading volume today"
    },
    {
      title: "Market Sentiment",
      value: coinsWithValidChange.length > 0 ? (gainers.length / coinsWithValidChange.length) * 100 : 0,
      icon: Activity,
      color: gainers.length > losers.length ? "from-emerald-500 to-green-500" : "from-red-500 to-orange-500",
      bgColor: gainers.length > losers.length ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20",
      formatter: (val) => `${val.toFixed(0)}%`,
      description: "Coins gaining today"
    }
  ];

  return (
    <motion.section 
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold gradient-text mb-4">Market Overview</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Real-time cryptocurrency market statistics and insights
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className={`relative group overflow-hidden rounded-2xl p-6 border backdrop-blur-xl ${stat.bgColor} hover:shadow-2xl transition-all duration-500`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1 + 0.5,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              y: -8, 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {/* Icon */}
            <motion.div
              className="flex items-center justify-between mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              <motion.div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon size={24} className="text-white" />
              </motion.div>
              
              {/* Trend indicator */}
              <motion.div
                className="flex items-center space-x-1"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.5 
                }}
              >
                {stat.title === "Market Sentiment" ? (
                  gainers.length > losers.length ? (
                    <TrendingUp size={16} className="text-emerald-400" />
                  ) : (
                    <TrendingDown size={16} className="text-red-400" />
                  )
                ) : (
                  <TrendingUp size={16} className="text-emerald-400" />
                )}
              </motion.div>
            </motion.div>

            {/* Value */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.8 }}
            >
              <motion.div
                className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                key={stat.value} // Re-animate when value changes
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {stat.formatter(stat.value)}
              </motion.div>
            </motion.div>

            {/* Title and Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.9 }}
            >
              <h3 className="font-semibold text-white mb-1">{stat.title}</h3>
              <p className="text-sm text-slate-400">{stat.description}</p>
            </motion.div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Market Insights */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="text-emerald-400" size={20} />
            <h4 className="font-semibold text-emerald-400">Top Gainers</h4>
          </div>
          <p className="text-2xl font-bold text-white">{gainers.length}</p>
          <p className="text-sm text-slate-400">Cryptocurrencies up 24h</p>
          <div className="mt-2 text-xs text-emerald-400">
            {gainers.length > 0 && `Best: +${Math.max(...gainers.map(c => c.price_change_percentage_24h)).toFixed(2)}%`}
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingDown className="text-red-400" size={20} />
            <h4 className="font-semibold text-red-400">Top Losers</h4>
          </div>
          <p className="text-2xl font-bold text-white">{losers.length}</p>
          <p className="text-sm text-slate-400">Cryptocurrencies down 24h</p>
          <div className="mt-2 text-xs text-red-400">
            {losers.length > 0 && `Worst: ${Math.min(...losers.map(c => c.price_change_percentage_24h)).toFixed(2)}%`}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default StatsSection;