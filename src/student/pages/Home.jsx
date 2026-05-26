import React, { useState, useEffect } from 'react';
import {
  BookOpen, Video, ClipboardList, FileCheck,
  CalendarCheck, CreditCard, ChevronRight,
  Radio, Clock, TrendingUp, Award, Bell, Target, Zap, Trophy, Calendar
} from 'lucide-react';
import api from '../../utils/api';

const Home = ({ onNavigateToCourses, onNavigateToLive }) => {
  const [student, setStudent] = useState(null);
  const [liveClasses, setLiveClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [tests, setTests] = useState([]);
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

        // Fetch assignments and tests if paid
        if (profileRes.data.student?.dueAmount === 0) {
          try {
            const [assignmentsRes, testsRes] = await Promise.all([
              api.get('/student/assignments'),
              api.get('/student/tests')
            ]);
            setAssignments(assignmentsRes.data.assignments || []);
            setTests(testsRes.data.tests || []);
          } catch (err) {
            console.error('Error fetching assignments/tests:', err);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const liveNow = liveClasses.filter(lc => lc.status === 'live');
  const upcoming = liveClasses.filter(lc => lc.status === 'upcoming').slice(0, 3);
  const courseName = student?.enrolledCourses?.[0]?.name || student?.batch?.course?.name || null;
  const batchName = student?.batch?.name || null;
  const dueAmount = student?.dueAmount || 0;
  const isPaid = dueAmount === 0;

  // Calculate stats
  const pendingAssignments = assignments.filter(a => a.status === 'Pending' || a.status === 'Not Started').length;
  const completedAssignments = assignments.filter(a => a.status === 'Submitted').length;
  const upcomingTests = tests.filter(t => new Date(t.date) > new Date()).length;

  // Calculate dynamic progress
  const totalTasks = assignments.length + tests.length;
  const completedTasks = completedAssignments + tests.filter(t => t.status === 'Completed').length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 pb-20 md:pb-6 transition-colors duration-300">

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700 dark:from-teal-900 dark:via-slate-900 dark:to-slate-950 px-4 pt-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Greeting */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-teal-100 dark:text-teal-400 text-sm font-medium">{greeting}</p>
              <h1 className="text-white text-2xl md:text-3xl font-bold mt-0.5">
                {studentName.split(' ')[0]} 👋
              </h1>
              {courseName && (
                <p className="text-teal-100 dark:text-slate-400 text-sm mt-1">
                  {courseName}{batchName ? ` · ${batchName}` : ''}
                </p>
              )}
              <p className="text-teal-200 dark:text-slate-500 text-xs mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 dark:bg-gradient-to-br dark:from-teal-500 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="text-white font-bold text-lg">
                {studentName.charAt(0)}
              </span>
            </div>
          </div>

          {/* Live Now Alert */}
          {liveNow.length > 0 && (
            <button onClick={onNavigateToLive}
              className="w-full bg-green-500/20 dark:bg-gradient-to-r dark:from-green-600/30 dark:to-teal-600/30 border border-green-400/40 dark:border-green-500/40 rounded-2xl p-4 flex items-center gap-3 hover:border-green-400/60 dark:hover:border-green-500/60 transition-all mb-4 backdrop-blur-sm">
              <div className="w-10 h-10 bg-green-500/30 dark:bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Radio className="w-5 h-5 text-green-600 dark:text-green-400 animate-pulse" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-green-700 dark:text-green-400 font-bold text-sm">Class is Live Now!</p>
                <p className="text-gray-700 dark:text-slate-300 text-xs mt-0.5">{liveNow[0].title} · {liveNow[0].batchName}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-600 dark:bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                Join <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          )}

          {/* Progress Card */}
          {courseName && (
            <div className="bg-white/20 dark:bg-slate-800/60 border border-white/30 dark:border-teal-500/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-100 dark:text-teal-400" />
                  <span className="text-white font-semibold text-sm">Course Progress</span>
                </div>
                <span className="text-teal-100 dark:text-teal-400 text-sm font-bold">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-white/20 dark:bg-slate-700 rounded-full h-2 mb-3">
                <div className="bg-white dark:bg-gradient-to-r dark:from-teal-500 dark:to-cyan-500 h-2 rounded-full transition-all shadow-lg" style={{ width: `${progressPercentage}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-teal-100 dark:text-slate-400 text-xs">{courseName}</p>
                <button onClick={onNavigateToCourses}
                  className="flex items-center gap-1 text-white dark:text-teal-400 text-xs font-semibold hover:text-teal-100 dark:hover:text-teal-300 transition-colors">
                  Continue <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-6 mt-6">

        {/* Due Amount Warning */}
        {dueAmount > 0 && (
          <button className="w-full bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-all">
            <Bell className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-red-700 dark:text-red-300 font-semibold text-sm">Payment Due</p>
              <p className="text-red-600 dark:text-slate-400 text-xs mt-0.5">₹{dueAmount.toLocaleString()} pending — pay to unlock all content</p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        )}

        {/* Quick Stats Overview */}
        {isPaid && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 text-center">
              <Target className="w-6 h-6 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{student?.enrolledCourses?.length || 0}</p>
              <p className="text-xs text-gray-600 dark:text-slate-500 mt-1">Active Courses</p>
            </div>
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 text-center">
              <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{pendingAssignments}</p>
              <p className="text-xs text-gray-600 dark:text-slate-500 mt-1">Pending Tasks</p>
            </div>
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 text-center">
              <Trophy className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedAssignments}</p>
              <p className="text-xs text-gray-600 dark:text-slate-500 mt-1">Completed</p>
            </div>
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 text-center">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{upcomingTests}</p>
              <p className="text-xs text-gray-600 dark:text-slate-500 mt-1">Upcoming Tests</p>
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-gray-900 dark:text-white font-bold text-base mb-3">Quick Access</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <button onClick={onNavigateToCourses}
              className="relative bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 hover:border-teal-300 dark:hover:border-teal-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:shadow-lg group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold text-center leading-tight">My Courses</p>
            </button>

            <button onClick={onNavigateToLive}
              className="relative bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 hover:border-teal-300 dark:hover:border-teal-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:shadow-lg group">
              {liveNow.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold text-center leading-tight">Live Classes</p>
            </button>

            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'assignments' }))}
              className="relative bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 hover:border-teal-300 dark:hover:border-teal-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:shadow-lg group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold text-center leading-tight">Assignments</p>
            </button>

            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'tests' }))}
              className="relative bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 hover:border-teal-300 dark:hover:border-teal-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:shadow-lg group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold text-center leading-tight">Tests</p>
            </button>

            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'attendance' }))}
              className="relative bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 hover:border-teal-300 dark:hover:border-teal-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:shadow-lg group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold text-center leading-tight">Attendance</p>
            </button>

            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'payments' }))}
              className="relative bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 hover:border-teal-300 dark:hover:border-teal-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:shadow-lg group">
              <div className={`w-10 h-10 bg-gradient-to-br ${dueAmount > 0 ? 'from-red-600 to-rose-600' : 'from-slate-600 to-slate-700'} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold text-center leading-tight">Payments</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        {isPaid && assignments.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-900 dark:text-white font-bold text-base">Recent Assignments</h2>
              <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'assignments' }))} 
                className="text-teal-600 dark:text-teal-400 text-xs font-semibold flex items-center gap-1 hover:text-teal-700 dark:hover:text-teal-300">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {assignments.slice(0, 3).map((assignment, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white font-semibold text-sm truncate">{assignment.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-500 dark:text-slate-500" />
                      <span className="text-gray-600 dark:text-slate-400 text-xs">
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0 ${
                    assignment.status === 'Submitted' 
                      ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' 
                      : 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400'
                  }`}>
                    {assignment.status || 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Classes */}
        {upcoming.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-900 dark:text-white font-bold text-base">Upcoming Classes</h2>
              <button onClick={onNavigateToLive} className="text-teal-600 dark:text-teal-400 text-xs font-semibold flex items-center gap-1 hover:text-teal-700 dark:hover:text-teal-300">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {upcoming.map(lc => (
                <div key={lc._id} className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-purple-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white font-semibold text-sm truncate">{lc.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-500 dark:text-slate-500" />
                      <span className="text-gray-600 dark:text-slate-400 text-xs">
                        {new Date(lc.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {new Date(lc.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <span className="text-purple-600 dark:text-blue-400 text-xs font-semibold bg-purple-100 dark:bg-blue-500/10 border border-purple-200 dark:border-blue-500/20 px-2 py-1 rounded-lg flex-shrink-0">
                    {lc.batchName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Stats */}
        <div>
          <h2 className="text-gray-900 dark:text-white font-bold text-base mb-3">Your Performance</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 text-center">
              <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400">{progressPercentage}%</p>
              <p className="text-gray-600 dark:text-slate-500 text-xs mt-0.5">Progress</p>
            </div>
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 text-center">
              <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{completedAssignments}</p>
              <p className="text-gray-600 dark:text-slate-500 text-xs mt-0.5">Completed</p>
            </div>
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-4 text-center">
              <Video className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{liveClasses.length}</p>
              <p className="text-gray-600 dark:text-slate-500 text-xs mt-0.5">Classes</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
