import { motion } from "framer-motion";

const SkeletonCard = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative overflow-hidden"
  >
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      {/* Rank badge skeleton */}
      <div className="absolute top-4 right-4">
        <div className="w-8 h-5 bg-slate-700 rounded-full animate-pulse"></div>
      </div>

      {/* Header section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-slate-700 rounded-full animate-pulse ring-2 ring-white/10"></div>
        
        <div className="flex-1">
          <div className="w-28 h-5 bg-slate-700 rounded animate-pulse mb-2"></div>
          <div className="w-16 h-4 bg-slate-600 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Price section */}
      <div className="mb-6">
        <div className="w-36 h-8 bg-slate-700 rounded animate-pulse mb-3"></div>
        <div className="w-20 h-6 bg-slate-600 rounded-full animate-pulse"></div>
      </div>

      {/* Market cap section */}
      <div className="bg-slate-900/30 rounded-xl p-4 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="w-20 h-4 bg-slate-600 rounded animate-pulse mb-2"></div>
            <div className="w-24 h-5 bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="w-6 h-6 bg-slate-600 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear",
            delay: index * 0.2 
          }}
        />
      </div>
    </div>
  </motion.div>
);

const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between py-4"
      >
        <div>
          <div className="w-48 h-8 bg-slate-700 rounded animate-pulse mb-2"></div>
          <div className="w-32 h-5 bg-slate-600 rounded animate-pulse"></div>
        </div>
        <div className="w-16 h-8 bg-slate-700 rounded-full animate-pulse"></div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: count }, (_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>

      {/* Loading indicator */}
      <motion.div 
        className="flex items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3 text-slate-400">
          <motion.div
            className="w-8 h-8 border-2 border-slate-600 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-lg font-medium">Loading cryptocurrency data...</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSkeleton;