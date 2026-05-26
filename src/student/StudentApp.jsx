import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
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

    // Listen for custom navigation events from Home page quick links
    const handleNavigate = (e) => {
      navigate_to(e.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
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
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 transition-colors duration-300">
        {/* Sidebar — always overlay, opens only with menu button */}
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

        {/* Main Content with smooth scroll */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 scroll-smooth">
          <div className="transition-opacity duration-300">
            {renderContent()}
          </div>
        </main>

        {/* Bottom Nav — mobile only */}
        <BottomNav activeSection={activeSection} setActiveSection={navigate_to} />
      </div>
    </ThemeProvider>
  );
}

export default StudentApp;
