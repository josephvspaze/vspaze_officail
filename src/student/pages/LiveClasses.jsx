import React, { useState, useEffect } from 'react';
import { Video, RefreshCw, Radio, CalendarClock, CheckCircle } from 'lucide-react';
import api from '../../utils/api';
import LiveClassItem from '../components/liveclass/LiveClassItem';

const LiveClasses = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLiveClasses();
    // Auto-refresh every 60 seconds to catch status changes
    const interval = setInterval(fetchLiveClasses, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveClasses = async () => {
    try {
      const res = await api.get('/student/live-classes');
      setLiveClasses(res.data.liveClasses || []);
    } catch (e) {
      console.error('Error fetching live classes:', e);
    } finally {
      setLoading(false);
    }
  };

  const live     = liveClasses.filter(lc => lc.status === 'live');
  const upcoming = liveClasses.filter(lc => lc.status === 'upcoming');
  const ended    = liveClasses.filter(lc => lc.status === 'ended');

  const filtered = filter === 'all' ? liveClasses
    : filter === 'live' ? live
    : filter === 'upcoming' ? upcoming
    : ended;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900/80 to-cyan-900/80 border-b border-cyan-500/20 px-4 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">Live Classes</h1>
            <p className="text-cyan-300 text-sm mt-0.5">Join your scheduled online sessions</p>
          </div>
          <button onClick={fetchLiveClasses} className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        {/* Live Now Banner */}
        {live.length > 0 && (
          <div className="bg-gradient-to-r from-green-900/40 to-teal-900/40 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3">
            <Radio className="w-4 h-4 text-green-400 animate-pulse flex-shrink-0" />
            <p className="text-green-300 font-semibold text-sm">
              {live.length} class{live.length > 1 ? 'es are' : ' is'} live right now! Join below.
            </p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-slate-800/80 border border-slate-700/50 rounded-xl p-1">
          {[
            { key: 'all',      label: 'All',      count: liveClasses.length, icon: Video },
            { key: 'live',     label: 'Live',     count: live.length,        icon: Radio },
            { key: 'upcoming', label: 'Upcoming', count: upcoming.length,    icon: CalendarClock },
            { key: 'ended',    label: 'Ended',    count: ended.length,       icon: CheckCircle },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => setFilter(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === tab.key ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}>
                <Icon className="w-3 h-3" />
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400 mb-3"></div>
            <p className="text-slate-400 text-sm">Loading classes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
            <Video className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold">No classes found</p>
            <p className="text-slate-500 text-sm mt-1">
              {filter === 'live' ? 'No live classes right now' : 'Check back later for scheduled classes'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(lc => <LiveClassItem key={lc._id} liveClass={lc} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;
