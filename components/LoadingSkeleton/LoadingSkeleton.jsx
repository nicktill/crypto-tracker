const LoadingSkeleton = () => {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-slate-700 rounded-full loading-skeleton"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-700 rounded loading-skeleton w-1/4"></div>
            <div className="h-3 bg-slate-700 rounded loading-skeleton w-1/6"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-700 rounded loading-skeleton w-24"></div>
            <div className="h-3 bg-slate-700 rounded loading-skeleton w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;