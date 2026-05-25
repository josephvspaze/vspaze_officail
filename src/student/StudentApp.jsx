import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from './components/StudentSidebar';
import BottomNav from './components/BottomNav';
import StudentHeader from './components/StudentHeader';
import Home from './pages/Home';
import LiveClasses from './pages/LiveClasses';
import CourseContent from './pages/CourseContent';
import Assignments from './pages/Assignments';
import Tests from './pages/Tests';
import Attendance from './pages/Attendance';
import Payments from './pages/Payments';
import ProfileNew from './pages/ProfileNew';
import Notifications from './pages/Notifications';
import CodePractice from './pages/CodePractice';

function StudentApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('student_auth') || '{}');
    if (auth.isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      navigate('/student-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('student_auth');
    localStorage.removeItem('token');
    navigate('/');
  };

  const navigate_to = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  if (!isAuthenticated) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'home':         return <Home onNavigateToCourses={() => navigate_to('courses')} onNavigateToLive={() => navigate_to('live-classes')} />;
      case 'live-classes': return <LiveClasses />;
      case 'courses':      return <CourseContent />;
      case 'assignments':  return <Assignments />;
      case 'tests':        return <Tests />;
      case 'attendance':   return <Attendance />;
      case 'payments':     return <Payments />;
      case 'profile':      return <ProfileNew onMenuClick={() => setSidebarOpen(true)} />;
      case 'notifications':return <Notifications onBack={() => navigate_to('home')} />;
      case 'practice':     return <CodePractice onMenuClick={() => setSidebarOpen(true)} />;
      default:             return <Home />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      {/* Sidebar — always overlay */}
      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={navigate_to}
        onLogout={handleLogout}
      />

      {/* Header */}
      <StudentHeader
        onMenuClick={() => setSidebarOpen(true)}
        onNotificationClick={() => navigate_to('notifications')}
        onLogoClick={() => navigate_to('home')}
        onLogout={handleLogout}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {renderContent()}
      </main>

      {/* Bottom Nav — mobile only */}
      <BottomNav activeSection={activeSection} setActiveSection={navigate_to} />
    </div>
  );
}

export default StudentApp;
