import Head from "next/head";
import { motion } from "framer-motion";

const Layout = ({ children, title = "Crypto Tracker - Modern Dashboard" }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative">
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Track, analyze, and manage your cryptocurrency portfolio with real-time data and beautiful insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute -bottom-40 right-20 w-60 h-60 bg-indigo-500 rounded-full opacity-15 blur-3xl"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 glass border-b border-slate-700/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold gradient-text">CryptoTracker</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Dashboard
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Portfolio
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Watchlist
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Settings
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="glass rounded-lg p-2 hover:bg-slate-700 transition-all duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="glass rounded-lg p-2 hover:bg-slate-700 transition-all duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <motion.footer 
        className="relative z-10 mt-16 border-t border-slate-700/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-slate-400 mb-4">
              Built with ❤️ using Next.js, ShadCN UI, Magic UI, Framer Motion & Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">API</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Support</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Layout;