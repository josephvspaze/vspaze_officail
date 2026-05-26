import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-slate-700 rounded-xl"></div>
      <div className="flex-1">
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-slate-700 rounded"></div>
      <div className="h-3 bg-slate-700 rounded w-5/6"></div>
    </div>
  </div>
);

export const StatSkeleton = () => (
  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 animate-pulse">
    <div className="w-14 h-14 bg-slate-700 rounded-xl mb-4"></div>
    <div className="h-3 bg-slate-700 rounded w-1/2 mb-2"></div>
    <div className="h-8 bg-slate-700 rounded w-3/4"></div>
  </div>
);

export const ListSkeleton = ({ count = 3 }) => (
  <div className="space-y-3">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-700 rounded-xl flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-slate-800 rounded w-1/4"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/3 mb-4 animate-pulse"></div>
          <ListSkeleton count={3} />
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/3 mb-4 animate-pulse"></div>
          <ListSkeleton count={3} />
        </div>
      </div>
    </div>
  </div>
);
