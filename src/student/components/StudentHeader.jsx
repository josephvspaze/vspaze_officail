import React from 'react';
import { Menu, Bell, GraduationCap } from 'lucide-react';

const StudentHeader = ({ onMenuClick, onNotificationClick, onLogoClick }) => {
  const studentAuth = JSON.parse(localStorage.getItem('student_auth') || '{}');
  const student = studentAuth.student || {};
  const initials = student.name?.split(' ').map(n => n[0]).join('') || 'S';

  return (
    <header className="bg-slate-900 border-b border-teal-500/20 sticky top-0 z-30 flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-base hidden sm:block">Vspaze</span>
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button onClick={onNotificationClick}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900" />
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
