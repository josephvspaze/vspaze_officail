import React from 'react';
import {
  Home, Video, BookOpen, ClipboardList, FileCheck,
  CalendarCheck, CreditCard, User, Code, X, LogOut, GraduationCap
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home',         label: 'Dashboard',      icon: Home,          section: 'main' },
  { id: 'live-classes', label: 'Live Classes',    icon: Video,         section: 'main' },
  { id: 'courses',      label: 'My Courses',      icon: BookOpen,      section: 'main' },
  { id: 'assignments',  label: 'Assignments',     icon: ClipboardList, section: 'learn' },
  { id: 'tests',        label: 'Tests & Quizzes', icon: FileCheck,     section: 'learn' },
  { id: 'attendance',   label: 'Attendance',      icon: CalendarCheck, section: 'learn' },
  { id: 'practice',     label: 'Code Practice',   icon: Code,          section: 'learn' },
  { id: 'payments',     label: 'Payments',        icon: CreditCard,    section: 'account' },
  { id: 'profile',      label: 'My Profile',      icon: User,          section: 'account' },
];

const SECTIONS = [
  { key: 'main',    label: 'Learning' },
  { key: 'learn',   label: 'Activities' },
  { key: 'account', label: 'Account' },
];

const StudentSidebar = ({ isOpen, onClose, activeSection, setActiveSection, onLogout }) => {
  const studentAuth = JSON.parse(localStorage.getItem('student_auth') || '{}');
  const student = studentAuth.student || {};

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      )}

      {/* Drawer - always overlay, opens only with menu button */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 border-r border-teal-500/20 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-teal-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-base">Vspaze</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Info */}
        <div className="px-5 py-4 border-b border-teal-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {student.name?.split(' ').map(n => n[0]).join('') || 'S'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{student.name || 'Student'}</p>
              <p className="text-teal-400 text-xs truncate">{student.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scroll-smooth">
          {SECTIONS.map(section => {
            const items = NAV_ITEMS.filter(i => i.section === section.key);
            return (
              <div key={section.key}>
                <p className="text-teal-400/70 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
                  {section.label}
                </p>
                <div className="space-y-1">
                  {items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}>
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {item.label}
                        {item.id === 'live-classes' && (
                          <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-teal-500/10">
          <button onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;
