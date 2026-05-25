import React from 'react';
import { Radio, CalendarClock, CheckCircle } from 'lucide-react';

const LiveClassBadge = ({ status }) => {
  if (status === 'live') return (
    <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold animate-pulse">
      <Radio className="w-3 h-3" /> LIVE
    </span>
  );
  if (status === 'upcoming') return (
    <span className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold">
      <CalendarClock className="w-3 h-3" /> Upcoming
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2 py-1 bg-slate-600/50 text-slate-400 border border-slate-500/30 rounded-full text-xs font-semibold">
      <CheckCircle className="w-3 h-3" /> Ended
    </span>
  );
};

export default LiveClassBadge;
