import React from 'react';
import { Home, Video, BookOpen, ClipboardList, User } from 'lucide-react';

const NAV = [
  { id: 'home',         label: 'Home',       icon: Home },
  { id: 'live-classes', label: 'Live',        icon: Video },
  { id: 'courses',      label: 'Courses',     icon: BookOpen },
  { id: 'assignments',  label: 'Tasks',       icon: ClipboardList },
  { id: 'profile',      label: 'Profile',     icon: User },
];

const BottomNav = ({ activeSection, setActiveSection }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-teal-500/20 z-30 md:hidden">
    <div className="flex justify-around items-center px-2 py-2">
      {NAV.map(({ id, label, icon: Icon }) => {
        const isActive = activeSection === id;
        return (
          <button key={id} onClick={() => setActiveSection(id)}
            className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative">
            {id === 'live-classes' && (
              <span className="absolute top-1 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            )}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-0.5 transition-all ${
              isActive ? 'bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30' : ''
            }`}>
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
            </div>
            <span className={`text-[10px] font-medium ${isActive ? 'text-teal-400' : 'text-slate-500'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default BottomNav;
