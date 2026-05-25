import React, { useState, useEffect } from 'react';
import {
  BookOpen, Video, ClipboardList, FileCheck,
  CalendarCheck, CreditCard, ChevronRight,
  Radio, Clock, TrendingUp, Award, Bell
} from 'lucide-react';
import api from '../../utils/api';

const Home = ({ onNavigateToCourses, onNavigateToLive }) => {
  const [student, setStudent] = useState(null);
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentAuth = JSON.parse(localStorage.getItem('student_auth') || '{}');
  const studentName = studentAuth.student?.name || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, liveRes] = await Promise.all([
          api.get('/student/profile'),
          api.get('/student/live-classes')
        ]);
        setStudent(profileRes.data.student);
        setLiveClasses(liveRes.data.liveClasses || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const liveNow = liveClasses.filter(lc => lc.status === 'live');
  const upcoming = liveClasses.filter(lc => lc.status === 'upcoming').slice(0, 2);
  const courseName = student?.enrolledCourses?.[0]?.name || student?.batch?.course?.name || null;
  const batchName = student?.batch?.name || null;
  const dueAmount = student?.dueAmount || 0;

  const quickActions = [
    { id: 'courses',     label: 'My Courses',   icon: BookOpen,      color: 'from-teal-600 to-cyan-600',    desc: 'Continue learning' },
    { id: 'live',        label: 'Live Classes',  icon: Video,         color: 'from-green-600 to-teal-600',   desc: liveNow.length > 0 ? `${liveNow.length} live now` : 'View schedule' },
    { id: 'assignments', label: 'Assignments',   icon: ClipboardList, color: 'from-blue-600 to-indigo-600',  desc: 'Pending tasks' },
    { id: 'tests',       label: 'Tests',         icon: FileCheck,     color: 'from-purple-600 to-pink-600',  desc: 'Take a quiz' },
    { id: 'attendance',  label: 'Attendance',    icon: CalendarCheck, color: 'from-orange-600 to-amber-600', desc: 'View records' },
    { id: 'payments',    label: 'Payments',      icon: CreditCard,    color: dueAmount > 0 ? 'from-red-600 to-rose-600' : 'from-slate-600 to-slate-700', desc: dueAmount > 0 ? `₹${dueAmount.toLocaleString()} due` : 'All clear' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-20 md:pb-6">

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 px-4 pt-6 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Greeting */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-teal-400 text-sm font-medium">{greeting}</p>
              <h1 className="text-white text-2xl font-bold mt-0.5">
                {studentName.split(' ')[0]} 👋
              </h1>
              {courseName && (
                <p className="text-slate-400 text-sm mt-1">
                  {courseName}{batchName ? ` · ${batchName}` : ''}
                </p>
              )}
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30">
              <span className="text-white font-bold text-lg">
                {studentName.charAt(0)}
              </span>
            </div>
          </div>

          {/* Live Now Alert */}
          {liveNow.length > 0 && (
            <button onClick={onNavigateToLive}
              className="w-full bg-gradient-to-r from-green-600/30 to-teal-600/30 border border-green-500/40 rounded-2xl p-4 flex items-center gap-3 hover:border-green-500/60 transition-all mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Radio className="w-5 h-5 text-green-400 animate-pulse" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-green-400 font-bold text-sm">Class is Live Now!</p>
                <p className="text-slate-300 text-xs mt-0.5">{liveNow[0].title} · {liveNow[0].batchName}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                Join <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          )}

          {/* Progress Card */}
          {courseName && (
            <div className="bg-slate-800/60 border border-teal-500/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <span className="text-white font-semibold text-sm">Course Progress</span>
                </div>
                <span className="text-teal-400 text-sm font-bold">45%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all" style={{ width: '45%' }} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-slate-400 text-xs">{courseName}</p>
                <button onClick={onNavigateToCourses}
                  className="flex items-center gap-1 text-teal-400 text-xs font-semibold hover:text-teal-300 transition-colors">
                  Continue <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 space-y-6 mt-6">

        {/* Due Amount Warning */}
        {dueAmount > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
            <Bell className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-300 font-semibold text-sm">Payment Due</p>
              <p className="text-slate-400 text-xs mt-0.5">₹{dueAmount.toLocaleString()} pending — pay to unlock all content</p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </div>
        )}

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-white font-bold text-base mb-3">Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map(action => {
              const Icon = action.icon;
              const isLive = action.id === 'live' && liveNow.length > 0;
              return (
                <button key={action.id}
                  onClick={() => action.id === 'live' ? onNavigateToLive?.() : null}
                  className="relative bg-slate-800/80 border border-slate-700/50 hover:border-teal-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:bg-slate-800 group">
                  {isLive && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                  <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-xs font-semibold text-center leading-tight">{action.label}</p>
                  <p className="text-slate-500 text-[10px] text-center leading-tight">{action.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Classes */}
        {upcoming.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-base">Upcoming Classes</h2>
              <button onClick={onNavigateToLive} className="text-teal-400 text-xs font-semibold flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {upcoming.map(lc => (
                <div key={lc._id} className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{lc.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-400 text-xs">
                        {new Date(lc.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {new Date(lc.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <span className="text-blue-400 text-xs font-semibold bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg flex-shrink-0">
                    {lc.batchName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div>
          <h2 className="text-white font-bold text-base mb-3">Your Stats</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Progress',  value: '45%',    icon: TrendingUp,  color: 'text-teal-400' },
              { label: 'Badges',    value: '8',       icon: Award,       color: 'text-yellow-400' },
              { label: 'Classes',   value: `${liveClasses.length}`, icon: Video, color: 'text-blue-400' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 text-center">
                  <Icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
