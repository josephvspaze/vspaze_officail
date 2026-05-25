import React from 'react';

const LiveClassBadge = ({ status }) => {
  if (status === 'live') return (
    <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold animate-pulse">
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> LIVE
    </span>
  );
  if (status === 'upcoming') return (
    <span className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold">
      📅 Upcoming
    </span>
  );
  return (
    <span className="px-2 py-1 bg-slate-600/50 text-slate-400 border border-slate-500/30 rounded-full text-xs font-semibold">
      Ended
    </span>
  );
};

export default LiveClassBadge;
