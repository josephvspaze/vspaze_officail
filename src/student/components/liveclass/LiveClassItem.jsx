import React from 'react';
import { Video, Calendar, Clock, ExternalLink } from 'lucide-react';
import LiveClassBadge from './LiveClassBadge';

const LiveClassItem = ({ liveClass }) => {
  const scheduled = new Date(liveClass.scheduledAt);
  const isLive = liveClass.status === 'live';
  const isEnded = liveClass.status === 'ended';

  return (
    <div className={`rounded-2xl border p-4 transition-all ${
      isLive
        ? 'bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/40 shadow-lg shadow-green-500/10'
        : isEnded
        ? 'bg-slate-800/50 border-slate-700/50 opacity-60'
        : 'bg-slate-800/80 border-slate-700/50 hover:border-cyan-500/30'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isLive ? 'bg-green-500/20' : 'bg-cyan-500/10'
          }`}>
            <Video className={`w-5 h-5 ${isLive ? 'text-green-400' : 'text-cyan-400'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold text-sm">{liveClass.title}</h4>
            <p className="text-slate-400 text-xs mt-0.5">{liveClass.batchName} · {liveClass.courseName}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-slate-400 text-xs">
                <Calendar className="w-3 h-3" />
                {scheduled.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <span className="flex items-center gap-1 text-slate-400 text-xs">
                <Clock className="w-3 h-3" />
                {scheduled.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
        <LiveClassBadge status={liveClass.status} />
      </div>

      {/* Join Button */}
      {isLive && (
        <a href={liveClass.meetLink} target="_blank" rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-green-500/30 transition-all hover:scale-[1.02]">
          <ExternalLink className="w-4 h-4" />
          Join Live Class Now
        </a>
      )}
      {!isLive && !isEnded && (
        <div className="mt-3 flex items-center gap-2 bg-slate-700/50 rounded-xl px-3 py-2">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-300 text-xs">Class starts at {scheduled.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )}
    </div>
  );
};

export default LiveClassItem;
