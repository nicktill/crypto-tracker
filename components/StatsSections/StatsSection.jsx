import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Users, Zap, Globe, Activity } from "lucide-react";

const StatsSection = ({ coins }) => {
  const totalMarketCap = coins.reduce((acc, coin) => acc + (coin.market_cap || 0), 0);
  const totalVolume = coins.reduce((acc, coin) => acc + (coin.total_volume || 0), 0);
  const gainers = coins.filter(coin => (coin.price_change_percentage_24h || 0) > 0);
  const losers = coins.filter(coin => (coin.price_change_percentage_24h || 0) < 0);
  
  const stats = [
    {
      title: "Cryptocurrencies",
      value: coins.length,
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      suffix: "",
      description: "Active tokens tracked"
    },
    {
      title: "Total Market Cap",
      value: totalMarketCap,
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      suffix: "T",
      formatter: (val) => `$${(val / 1e12).toFixed(2)}`,
      description: "Combined market value"
    },
    {
      title: "24h Volume",
      value: totalVolume,
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10 border-purple-500/20",
      suffix: "B",
      formatter: (val) => `$${(val / 1e9).toFixed(1)}`,
      description: "Trading volume today"
    },
    {
      title: "Market Sentiment",
      value: ((gainers.length / coins.length) * 100),
      icon: Activity,
      color: gainers.length > losers.length ? "from-emerald-500 to-green-500" : "from-red-500 to-orange-500",
      bgColor: gainers.length > losers.length ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20",
      suffix: "%",
      formatter: (val) => `${val.toFixed(0)}%`,
      description: "Coins gaining today"
    }
  ];

  const formatValue = (stat) => {
    if (stat.formatter) {
      return stat.formatter(stat.value);
    }
    if (stat.value >= 1e12) return `${(stat.value / 1e12).toFixed(2)}T`;
    if (stat.value >= 1e9) return `${(stat.value / 1e9).toFixed(1)}B`;
    if (stat.value >= 1e6) return `${(stat.value / 1e6).toFixed(1)}M`;
    return stat.value.toLocaleString();
  };

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
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent"></div>
            </div>

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
                {formatValue(stat)}
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

            {/* Hover effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)'
              }}
            />

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

            {/* Pulse indicator */}
            <motion.div
              className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: index * 0.3
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Additional Market Insights */}
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
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingDown className="text-red-400" size={20} />
            <h4 className="font-semibold text-red-400">Top Losers</h4>
          </div>
          <p className="text-2xl font-bold text-white">{losers.length}</p>
          <p className="text-sm text-slate-400">Cryptocurrencies down 24h</p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default StatsSection;