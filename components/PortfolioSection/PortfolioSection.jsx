import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Plus, TrendingUp, TrendingDown, Wallet, Info, Sparkles, Trash2, X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const PortfolioSection = ({ coins = [] }) => {
  const [hideBalances, setHideBalances] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [assetAmount, setAssetAmount] = useState('');
  const [isDemo, setIsDemo] = useState(true);

  // Initial demo portfolio data
  const demoPortfolioData = [
    { 
      id: 'bitcoin',
      symbol: 'BTC', 
      name: 'Bitcoin', 
      amount: 2.5, 
      purchasePrice: 35000,
      color: '#F7931A'
    },
    { 
      id: 'ethereum',
      symbol: 'ETH', 
      name: 'Ethereum', 
      amount: 45.2, 
      purchasePrice: 2200,
      color: '#627EEA'
    },
    { 
      id: 'solana',
      symbol: 'SOL', 
      name: 'Solana', 
      amount: 150, 
      purchasePrice: 60,
      color: '#9945FF'
    },
    { 
      id: 'usd-coin',
      symbol: 'USDC', 
      name: 'USD Coin', 
      amount: 3400, 
      purchasePrice: 1,
      color: '#2775CA'
    }
  ];

  const [portfolio, setPortfolio] = useState(demoPortfolioData);

  // Calculate portfolio data dynamically
  const calculatePortfolioData = () => {
    if (portfolio.length === 0) {
      return {
        totalValue: 0,
        dayChange: 0,
        dayChangeAmount: 0,
        holdings: []
      };
    }

    const holdings = portfolio.map(holding => {
      const coin = coins.find(c => c.id === holding.id);
      const currentPrice = coin ? coin.current_price : holding.purchasePrice;
      const value = holding.amount * currentPrice;
      const purchaseValue = holding.amount * holding.purchasePrice;
      const change = coin ? coin.price_change_percentage_24h || 0 : 0;
      
      return {
        ...holding,
        value,
        change,
        currentPrice,
        purchaseValue,
        pnl: value - purchaseValue,
        pnlPercentage: ((value - purchaseValue) / purchaseValue) * 100
      };
    });

    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const totalPurchaseValue = holdings.reduce((sum, h) => sum + h.purchaseValue, 0);
    const totalPnl = totalValue - totalPurchaseValue;
    const totalPnlPercentage = totalPurchaseValue > 0 ? (totalPnl / totalPurchaseValue) * 100 : 0;

    // Calculate allocations
    const holdingsWithAllocation = holdings.map(h => ({
      ...h,
      allocation: totalValue > 0 ? (h.value / totalValue) * 100 : 0
    }));

    return {
      totalValue,
      dayChange: totalPnlPercentage,
      dayChangeAmount: totalPnl,
      holdings: holdingsWithAllocation
    };
  };

  const portfolioData = calculatePortfolioData();

  const chartData = [
    { name: 'Jan', value: portfolioData.totalValue * 0.78 },
    { name: 'Feb', value: portfolioData.totalValue * 0.84 },
    { name: 'Mar', value: portfolioData.totalValue * 0.89 },
    { name: 'Apr', value: portfolioData.totalValue * 0.86 },
    { name: 'May', value: portfolioData.totalValue }
  ];

  const formatCurrency = (amount) => {
    if (hideBalances) return '****';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleAddAsset = () => {
    if (!selectedAsset || !assetAmount || parseFloat(assetAmount) <= 0) return;

    const coin = coins.find(c => c.id === selectedAsset);
    if (!coin) return;

    const newHolding = {
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      amount: parseFloat(assetAmount),
      purchasePrice: coin.current_price,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    };

    setPortfolio(prev => [...prev, newHolding]);
    setSelectedAsset('');
    setAssetAmount('');
    setShowAddModal(false);
    
    // If this is the first real asset added, turn off demo mode
    if (isDemo) {
      setIsDemo(false);
    }
  };

  const handleRemoveAsset = (assetId) => {
    setPortfolio(prev => prev.filter(h => h.id !== assetId));
  };

  const clearPortfolio = () => {
    setPortfolio([]);
    setIsDemo(false);
  };

  const loadDemoData = () => {
    setPortfolio(demoPortfolioData);
    setIsDemo(true);
  };

  return (
    <motion.section 
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white">Portfolio Overview</h2>
            {isDemo && (
              <motion.div 
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles size={14} className="text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">Demo Data</span>
              </motion.div>
            )}
            <button
              onClick={() => setHideBalances(!hideBalances)}
              className="p-2 glass rounded-lg hover:bg-slate-700 transition-all duration-300"
            >
              {hideBalances ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex items-center space-x-3">
            {portfolio.length > 0 && (
              <motion.button 
                onClick={clearPortfolio}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold hover:bg-red-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 size={16} />
                <span>Clear All</span>
              </motion.button>
            )}
            {!isDemo && portfolio.length === 0 && (
              <motion.button 
                onClick={loadDemoData}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 font-semibold hover:bg-blue-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={16} />
                <span>Load Demo</span>
              </motion.button>
            )}
            <motion.button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 gradient-bg rounded-xl text-white font-semibold hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} />
              <span>Add Asset</span>
            </motion.button>
          </div>
        </div>
        
        {/* Portfolio Stats */}
        {portfolio.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="text-center p-6 rounded-2xl bg-slate-800 bg-opacity-50 card-hover"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {formatCurrency(portfolioData.totalValue)}
                </div>
                <p className="text-slate-400">Total Portfolio Value</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-2xl bg-slate-800 bg-opacity-50 card-hover"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl font-bold mb-2 flex items-center justify-center space-x-2 ${
                  portfolioData.dayChange > 0 ? 'status-positive' : 'status-negative'
                }`}>
                  {portfolioData.dayChange > 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  <span>{portfolioData.dayChange > 0 ? '+' : ''}{portfolioData.dayChange.toFixed(2)}%</span>
                </div>
                <p className="text-slate-400">Total P&L</p>
                <p className={`text-sm ${portfolioData.dayChange > 0 ? 'status-positive' : 'status-negative'}`}>
                  {portfolioData.dayChange > 0 ? '+' : ''}{formatCurrency(portfolioData.dayChangeAmount)}
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-2xl bg-slate-800 bg-opacity-50 card-hover"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-white mb-2">{portfolioData.holdings.length}</div>
                <p className="text-slate-400">Assets</p>
              </motion.div>
            </div>

            {/* Portfolio Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Portfolio Performance</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [formatCurrency(value), 'Portfolio Value']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={portfolioData.holdings}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {portfolioData.holdings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [formatCurrency(value), 'Value']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Holdings List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Your Holdings</h3>
              {portfolioData.holdings.map((holding, index) => (
                <motion.div
                  key={holding.id}
                  className="p-4 rounded-xl bg-slate-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: holding.color }}
                      >
                        {holding.symbol[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{holding.name}</h4>
                        <p className="text-sm text-slate-400">{holding.symbol}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-white font-semibold">{formatCurrency(holding.value)}</p>
                        <p className="text-sm text-slate-400">{holding.amount} {holding.symbol}</p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${
                          holding.pnlPercentage > 0 ? 'status-positive' : 'status-negative'
                        }`}>
                          {holding.pnlPercentage > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span className="font-medium">
                            {holding.pnlPercentage > 0 ? '+' : ''}{holding.pnlPercentage.toFixed(2)}%
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">{holding.allocation.toFixed(1)}%</p>
                      </div>
                      <motion.button
                        onClick={() => handleRemoveAsset(holding.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Wallet size={64} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Assets in Portfolio</h3>
            <p className="text-slate-400 mb-6">Start building your portfolio by adding some assets</p>
            <div className="flex justify-center space-x-4">
              <motion.button 
                onClick={loadDemoData}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 font-semibold hover:bg-blue-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={16} />
                <span>Load Demo Data</span>
              </motion.button>
              <motion.button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-6 py-3 gradient-bg rounded-xl text-white font-semibold hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={16} />
                <span>Add Your First Asset</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Add Asset Modal */}
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Add Asset to Portfolio</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Asset {coins.length > 0 && `(${coins.length} available)`}
                  </label>
                  <select 
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">
                      {coins.length === 0 ? 'Loading coins...' : 'Select cryptocurrency...'}
                    </option>
                    {coins.slice(0, 50).map(coin => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name} ({coin.symbol.toUpperCase()}) - {formatCurrency(coin.current_price)}
                      </option>
                    ))}
                  </select>
                  {coins.length === 0 && (
                    <p className="text-sm text-yellow-400 mt-1">
                      Waiting for coin data to load...
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Amount
                  </label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    step="any"
                    min="0"
                    value={assetAmount}
                    onChange={(e) => setAssetAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                  {selectedAsset && assetAmount && !isNaN(parseFloat(assetAmount)) && parseFloat(assetAmount) > 0 && (
                    <p className="text-sm text-emerald-400 mt-1">
                      Total value: {formatCurrency((coins.find(c => c.id === selectedAsset)?.current_price || 0) * parseFloat(assetAmount))}
                    </p>
                  )}
                  {assetAmount && (isNaN(parseFloat(assetAmount)) || parseFloat(assetAmount) <= 0) && (
                    <p className="text-sm text-red-400 mt-1">
                      Please enter a valid amount greater than 0
                    </p>
                  )}
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-700 text-slate-400 rounded-lg hover:bg-slate-800 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAsset}
                    disabled={!selectedAsset || !assetAmount || parseFloat(assetAmount) <= 0 || coins.length === 0}
                    className="flex-1 px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {coins.length === 0 ? 'Loading...' : 'Add Asset'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default PortfolioSection;