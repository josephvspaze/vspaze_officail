import React, { useState, useEffect } from 'react';
import { Play, Search, Bell, BookOpen, Video, HelpCircle, MessageCircle, TrendingUp, Flame, Trophy, Menu } from 'lucide-react';
import Notifications from './Notifications';
import api from '../../utils/api';

const Home = ({ onNavigate, onMenuClick, onNavigateToCourses }) => {
  const [studentData, setStudentData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await api.get('/student/profile');
      setStudentData(response.data.student);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const userCourse = studentData?.enrolledCourses?.[0]?.name || 'No Course Enrolled';
  const userBatch  = studentData?.batch?.name || null;
  const batchCourse = studentData?.batch?.course?.name || null;

  if (showNotifications) {
    return <Notifications onBack={() => setShowNotifications(false)} />;
  }

  const quickActions = [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'live', label: 'Live', icon: Video },
    { id: 'tests', label: 'Tests', icon: HelpCircle },
    { id: 'doubts', label: 'Doubts', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-6" style={{ background: 'linear-gradient(135deg, #1a9b8e, #2db8a8)' }}>
      {/* Header */}
      <div className="shadow-sm sticky top-0 z-10" style={{ background: '#0d7a6f' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-white/10 rounded-full">
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#fff' }} />
              </button>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{ background: '#1a9b8e' }}>
                <span className="font-bold text-base sm:text-lg" style={{ color: '#fff' }}>
                  {studentData?.name?.charAt(0) || 'S'}
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm" style={{ color: '#fff' }}>Welcome back!</p>
                <p className="text-base sm:text-lg font-bold" style={{ color: '#fff' }}>{studentData?.name || 'Student'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="p-2 hover:bg-white/10 rounded-full hidden sm:block">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#fff' }} />
              </button>
              <button 
                onClick={() => setShowNotifications(true)}
                className="p-2 hover:bg-white/10 rounded-full relative"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#fff' }} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Continue Learning */}
        <div className="rounded-2xl shadow-sm p-6" style={{ background: '#fff' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#000' }}>My Enrollment</h2>

          {/* Course Info */}
          <div className="rounded-xl p-4 mb-3" style={{ background: '#e8f5f3' }}>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4" style={{ color: '#1a9b8e' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#1a9b8e' }}>Course</span>
            </div>
            <h3 className="font-bold text-base" style={{ color: '#000' }}>{userCourse}</h3>
            {studentData?.enrolledCourses?.length > 1 && (
              <p className="text-xs mt-1" style={{ color: '#555' }}>+{studentData.enrolledCourses.length - 1} more course(s)</p>
            )}
          </div>

          {/* Batch Info */}
          {userBatch ? (
            <div className="rounded-xl p-4" style={{ background: '#e8f5f3', border: '1px solid #d0ebe8' }}>
              <div className="flex items-center gap-2 mb-1">
                <Video className="w-4 h-4" style={{ color: '#1a9b8e' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#1a9b8e' }}>Batch</span>
              </div>
              <h3 className="font-bold text-base" style={{ color: '#000' }}>{userBatch}</h3>
              {batchCourse && <p className="text-xs mt-0.5" style={{ color: '#555' }}>{batchCourse}</p>}
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm" style={{ color: '#555' }}>45% Complete</span>
                <button onClick={onNavigateToCourses}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition"
                  style={{ background: '#1a9b8e' }}>
                  <Play className="w-5 h-5 text-white fill-white" />
                </button>
              </div>
              <div className="w-full rounded-full h-2 mt-2" style={{ background: '#e0e0e0' }}>
                <div className="h-2 rounded-full" style={{ width: '45%', background: '#1a9b8e' }}></div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl p-4 text-center" style={{ background: '#f5f5f5', border: '1px dashed #ccc' }}>
              <p className="text-sm" style={{ color: '#888' }}>No batch assigned yet.</p>
              <p className="text-xs mt-1" style={{ color: '#aaa' }}>Contact admin to get assigned to a batch.</p>
            </div>
          )}
        </div>

        {/* Upcoming Live Sessions */}
        <div className="rounded-2xl shadow-sm p-6" style={{ background: '#fff' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#000' }}>Upcoming Live Sessions</h2>
          <div className="space-y-3">
            <div className="rounded-xl p-4" style={{ background: '#e8f5f3', border: '1px solid #d0ebe8' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ color: '#fff', background: '#1a9b8e' }}>
                  Today 10:00 AM
                </span>
                <button className="text-sm font-medium" style={{ color: '#1a9b8e' }}>Join</button>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#000' }}>Advanced Flutter Concepts</h3>
              <div className="flex items-center text-sm" style={{ color: '#555' }}>
                <span className="mr-1">👤</span>
                <span>Instructor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.id} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-2 hover:scale-105 transition" style={{ background: '#fff' }}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#1a9b8e' }} />
                </div>
                <span className="text-xs sm:text-sm font-medium" style={{ color: '#000' }}>{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Your Progress */}
        <div className="rounded-2xl shadow-sm p-6" style={{ background: '#fff' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: '#000' }}>Your Progress</h2>
            <button style={{ color: '#1a9b8e' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: '#d4f1ed' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#1a9b8e' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: '#000' }}>65%</p>
              <p className="text-sm" style={{ color: '#555' }}>Overall</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: '#d4f1ed' }}>
                <Flame className="w-6 h-6" style={{ color: '#1a9b8e' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: '#000' }}>12 days</p>
              <p className="text-sm" style={{ color: '#555' }}>Streak</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: '#d4f1ed' }}>
                <Trophy className="w-6 h-6" style={{ color: '#1a9b8e' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: '#000' }}>8</p>
              <p className="text-sm" style={{ color: '#555' }}>Badges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
