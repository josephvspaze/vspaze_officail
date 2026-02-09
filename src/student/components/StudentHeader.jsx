import React from 'react';
import { Menu, Bell, LogOut, GraduationCap } from 'lucide-react';

const StudentHeader = ({ onMenuClick, onLogout, onNotificationClick, hideOnMobile = false, onLogoClick }) => {
  const studentAuth = JSON.parse(localStorage.getItem('student_auth') || '{}');
  const studentName = studentAuth.student?.name || 'Student';

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 ${hideOnMobile ? 'hidden md:block' : ''}`}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <button 
            onClick={onLogoClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">Vspaze Institute</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={onNotificationClick}
            className="p-2 hover:bg-gray-100 rounded-lg relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-900">{studentName}</p>
              <p className="text-xs text-gray-600">Student</p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xs sm:text-sm">
                {studentName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 hidden sm:block"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
